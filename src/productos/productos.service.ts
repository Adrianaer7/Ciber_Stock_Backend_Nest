import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UpdateProductoDto } from './dto/update-producto.dto';
import * as path from 'path';
import * as fs from 'fs';
import { VentasService } from 'src/ventas/ventas.service';
import { PorcentajesService } from 'src/porcentajes/porcentajes.service';
import { Porcentajes } from 'src/porcentajes/entities/porcentajes.entity';
import { ImagenesService } from 'src/imagenes/imagenes.service';
import { SocketService } from 'src/web-socket/web-socket.service';
import { DolaresService } from 'src/dolares/dolares.service';
import { RequestConUsuario } from 'src/helpers/interfaces';


@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly productosRepository: Repository<Productos>,
    private readonly porcentajeService: PorcentajesService,
    private readonly socketService: SocketService,

    @Inject(forwardRef(() => DolaresService))
    private readonly dolarService: DolaresService,

    @Inject(forwardRef(() => VentasService))  //Uso el forwardRef cuando dos módulos se importan mutuamente. Por ej, producto importa ventas, y el modulo de ventas importa productos
    private readonly ventasService: VentasService,

    @Inject(forwardRef(() => ImagenesService))
    private readonly imagenesService: ImagenesService
  ) { }

  async crearProducto(req: RequestConUsuario, createProductoDto: CreateProductoDto) {
    const { codigo, nombre, marca, modelo, barras, proveedor, notas } = createProductoDto

    if (createProductoDto.disponibles <= createProductoDto.limiteFaltante && createProductoDto.añadirFaltante) {
      createProductoDto.faltante = true
    }

    const descripcion = (codigo + nombre + marca + modelo + barras + notas).replace(/\s\s+/g, ' ').replace(/\s+/g, '')
    const creador = new ObjectId(req.usuario._id)
    const _id = new ObjectId()
    const nuevoProducto = this.productosRepository.create({
      ...createProductoDto,
      _id,
      descripcion,
      creador
    })

    try {
      const producto = await this.productosRepository.save(nuevoProducto)
      return { producto }
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`El código ${codigo} ya lo tiene otro producto`)
      }
      throw new InternalServerErrorException(error);
    }

  }



  async todosProductos(req: RequestConUsuario) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Productos> = {
      where: {
        creador
      },
      order: {
        creado: "DESC"
      }
    }
    const productos = await this.productosRepository.find(options)
    return { productos }
  }

  async todosProductosFaltantes(req: RequestConUsuario) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Productos> = {
      where: {
        creador,
        faltante: true
      }
    }
    return await this.productosRepository.find(options)
  }



  async elProducto(req: RequestConUsuario, id: string) {
    const producto: Productos | boolean = await this.findOne(req, id)
    if (!producto) {
      return { redireccionar: true }
    }
    return { producto }
  }



  async findOne(req: RequestConUsuario, id: string) {
    if (!ObjectId.isValid(id)) return false

    const _id = new ObjectId(id)
    let creador: ObjectId;
    let options: FindManyOptions<Productos>;

    if (req.usuario) {
      creador = new ObjectId(req.usuario._id)
    }

    if (creador) {
      options = { where: { creador, _id } }
    } else {
      options = { where: { _id } }
    }

    const producto: Productos = await this.productosRepository.findOne(options)
    if (!producto) return false

    return producto
  }

  async findOneByCode(req: RequestConUsuario, codigo: number) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Productos> = {
      where: {
        creador,
        codigo
      }
    }

    const producto: Productos = await this.productosRepository.findOne(options)
    if (!producto) return false

    return producto
  }

  async findOneByImage(req: RequestConUsuario, imagen: string) {

    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Productos> = {
      where: {
        creador,
        imagen
      }
    }
    const producto: Productos = await this.productosRepository.findOne(options)
    if (!producto) return false

    return producto
  }


  async editarUnProducto(req: RequestConUsuario, id: string, updateProductoDto: UpdateProductoDto, cliente?: boolean) {
    const { codigo, nombre, marca, modelo, barras, proveedor, notas, imagen } = updateProductoDto.producto
    const producto: Productos | boolean = await this.findOne(req, id)

    if (!producto) {
      throw new NotFoundException("Producto no existe")
    }

    let creador: ObjectId;
    if (req.usuario) {
      creador = new ObjectId(req.usuario._id)
    }
    const _id = new ObjectId(producto._id)


    //listado proveedores
    if (proveedor && updateProductoDto.desdeForm) {
      if (!updateProductoDto.producto.todos_proveedores.length) {   //si no hay ningun proveedor
        updateProductoDto.producto.todos_proveedores.push(proveedor)
      } else {
        let proveedorIgual = updateProductoDto.producto.todos_proveedores.find(provider => provider === proveedor)
        if (!proveedorIgual) {  //si existen proveedores, pero ninguno igual
          updateProductoDto.producto.todos_proveedores.push(proveedor)
        }
      }
    }

    //faltante
    if (updateProductoDto.producto.disponibles <= updateProductoDto.producto.limiteFaltante && updateProductoDto.producto.añadirFaltante) {
      updateProductoDto.producto.faltante = true
    } else {
      updateProductoDto.producto.faltante = false
    }

    //Eliminar la imagen del fontend
    if (producto.imagen !== imagen && imagen) {    //si seleccioné una nueva imagen
      producto.imagen = imagen
    }

    if (producto.imagen !== imagen && !imagen) {    //si seleccioné una nueva imagen
      const res = await this.imagenesService.eliminarImagen(producto.imagen)
      if (res) {
        producto.imagen = ""
      }
    }

    updateProductoDto.producto.descripcion = (codigo + nombre + marca + modelo + barras + notas).replace(/\s\s+/g, ' ').replace(/\s+/g, '')

    updateProductoDto.producto = await this.calcularPrecios(req, updateProductoDto.producto, updateProductoDto.precio)

    //Para asegurarme no guardo los datos que vienen del front 
    updateProductoDto.producto._id = _id
    updateProductoDto.producto.creador = creador

    try {
      const producto = await this.productosRepository.save(updateProductoDto.producto)
      if (cliente) {
        await this.socketService.emitirProductos()
      }
      return { producto }
    } catch (error) {
      console.log(error)
    }
  }

  async editarProductos(req: RequestConUsuario, precio: number) {
    if (!precio) {
      return new BadRequestException("Precio no válido")
    }

    try {
      let { productos } = await this.todosProductos(req)

      if (productos.length) {
        for (const producto of productos) {
          const productoActualizado = await this.calcularPrecios(req, producto, precio);
          await this.productosRepository.save(productoActualizado)
        }

        return { productos: [] }

      } else {
        return productos
      }

    } catch (error) {
      console.log(error)
    }
  }

  async calcularPrecios(req: RequestConUsuario, producto: CreateProductoDto, precio?: Number) {
    let { precio_venta, valor_dolar_compra, precio_compra_peso } = producto;

    let porcentajeEfectivo: Porcentajes | boolean = await this.porcentajeService.findOneBy(req, "EFECTIVO")
    let porcentajeTarjeta: Porcentajes | boolean = await this.porcentajeService.findOneBy(req, "TARJETA")
    let porcentajeAhoraDoce: Porcentajes | boolean = await this.porcentajeService.findOneBy(req, "AHORADOCE")

    if (!precio) {
      const dolar = await this.dolarService.findOne(req)
      precio = Number(dolar.precio)
    }

    //compro en dolar
    if (precio_venta > 0 && valor_dolar_compra > 0) {
      const res1 = Number(precio_venta) / Number(valor_dolar_compra);
      const res2 = parseFloat((res1 * Number(precio)).toFixed(2));
      producto.precio_venta_conocidos = res2;
      producto.precio_venta_efectivo = this.calcularPrecio(res2, porcentajeEfectivo.comision);
      producto.precio_venta_tarjeta = this.calcularPrecio(res2, porcentajeTarjeta.comision);
      producto.precio_venta_ahoraDoce = this.calcularPrecio(parseFloat(producto.precio_venta_tarjeta.toString()), porcentajeAhoraDoce.comision);
      producto.precio_venta_cuotas = parseFloat((parseFloat(producto.precio_venta_ahoraDoce.toString()) / 12).toFixed(2));
    }

    //compro en peso
    if (precio_venta > 0 && precio_compra_peso > 0) {
      const res1 = parseFloat((precio_venta / valor_dolar_compra).toFixed(2));
      const res2 = parseFloat((Number(res1) * Number(precio)).toFixed(2));
      producto.precio_venta_conocidos = res2;
      producto.precio_venta_efectivo = this.calcularPrecio(res2, porcentajeEfectivo.comision);
      producto.precio_venta_tarjeta = this.calcularPrecio(res2, porcentajeTarjeta.comision);
      producto.precio_venta_ahoraDoce = this.calcularPrecio(parseFloat(producto.precio_venta_tarjeta.toString()), porcentajeAhoraDoce.comision);
      producto.precio_venta_cuotas = parseFloat((parseFloat(producto.precio_venta_ahoraDoce.toString()) / 12).toFixed(2));
    }

    return producto

  }

  calcularPrecio(precioBase, comision) {
    return parseFloat(((precioBase * (100 + Number(comision))) / 100).toFixed(2));
  }



  async productoCambiado(req: RequestConUsuario, id: string, producto: UpdateProductoDto) {
    this.editarUnProducto(req, id, producto)
  }



  async eliminarProducto(req: RequestConUsuario, id: string) {
    const producto: Productos | boolean = await this.findOne(req, id)
    if (!producto) {
      throw new NotFoundException("Producto no encontrado")
    }

    //para que al mostrar las ventas, no muestre opcion de eliminar o editar la venta
    const venta = await this.ventasService.findOneByProductId(req, producto._id)
    if (venta) {
      await this.ventasService.editarVenta(req, id, {cantidad: 0})
    }

    //Eliminar la imagen del fontend
    const { imagen } = producto
    if (imagen) {
      const rutaModificada = path.resolve(process.cwd(), '../cliente/public/imagenes')
      fs.unlinkSync(rutaModificada + `/${imagen}`) //unlink es una funcion que permite eliminar un archivo del SO.
    }

    await this.productosRepository.remove(producto)

    return { msg: "Producto eliminado" }
  }



  async eliminarTodos(req: RequestConUsuario) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Productos> = { where: { creador } }

    const productos = await this.productosRepository.find(options)
    if (!productos.length) {
      return { msg: "No se encontraron productos a eliminar" }
    }

    await this.productosRepository.remove(productos)

    return { msg: "Todos los productos se eliminaron" }
  }
}
