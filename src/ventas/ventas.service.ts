import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Ventas } from './entities/venta.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Productos } from 'src/productos/entities/producto.entity';
import { ProductosService } from 'src/productos/productos.service';
import { SocketService } from 'src/web-socket/web-socket.service';

@Injectable()
export class VentasService {

  constructor(
    @InjectRepository(Ventas)
    private readonly ventasRepository: Repository<Ventas>,
    private readonly socketService: SocketService,
    @Inject(forwardRef(() => ProductosService))
    private readonly productosService: ProductosService
  ) { }

  async agregarVenta(req: Request, createVentaDto: CreateVentaDto) {
    const creador = new ObjectId(req['usuario']._id)

    const nuevaVenta = this.ventasRepository.create({
      ...createVentaDto,
      creador
    })

    try {
      const venta = await this.ventasRepository.save(nuevaVenta)
      await this.socketService.emitirProductos()
      return { venta }
    } catch (error) {
      if (error.console.log('error') === 11000) {
        throw new BadRequestException(`La venta ya existe`)
      }
      throw new InternalServerErrorException(error);
    }
  }



  async todasVentas(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Ventas> = {
      where: {
        creador
      },
      order: {
        creado: "DESC"
      }
    }
    const ventas = await this.ventasRepository.find(options)
    return { ventas }
  }



  async laVenta(req: Request, id: string) {
    const venta: Ventas | boolean = await this.findOne(req, id)
    if (!venta) {
      throw new NotFoundException("La venta no existe")
    }

    return venta
  }



  async findOne(req: Request, id: string) {
    if (!ObjectId.isValid(id)) return false

    const _id = new ObjectId(id)
    const creador = new ObjectId(req['usuario']._id)

    const options: FindManyOptions<Ventas> = {
      where: {
        creador,
        _id
      }
    }

    const venta: Ventas = await this.ventasRepository.findOne(options)
    if (!venta) return false

    return venta
  }


  async findOneByProductId(req: Request, idProducto: ObjectId) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Ventas> = {
      where: {
        creador,
        idProducto
      }
    }

    const venta: Ventas = await this.ventasRepository.findOne(options)
    if (!venta) return false

    return venta
  }

  async editarVenta(req: Request, id: string, updateVentaDto: UpdateVentaDto) {
    const venta: Ventas | boolean = await this.findOne(req, id)
    if (!venta) {
      throw new NotFoundException("La venta no existe")
    }

    const producto: Productos | boolean = await this.productosService.findOne(req, updateVentaDto.idProducto)
    if (!producto) {
      throw new BadRequestException("No se pueden devolver las unidades porque el producto ya no existe")
    }

    const creador = new ObjectId(req['usuario']._id)
    const _id = new ObjectId(venta._id)

    Object.assign(venta, updateVentaDto)

    //Para asegurarme no guardo los datos que vienen del front
    updateVentaDto._id = _id
    updateVentaDto.creador = creador

    //Actualizo las unidades del producto
    producto.disponibles = producto.disponibles + updateVentaDto.cantidad
    await this.productosService.productoCambiado(req, updateVentaDto.idProducto, producto)

    //Actualizo las unidades vendidas del producto
    updateVentaDto.unidades = venta.unidades - updateVentaDto.cantidad
    const laVenta = await this.ventasRepository.save(updateVentaDto)
    await this.socketService.emitirProductos()
    return { venta: laVenta }
  }



  async eliminarVenta(req: Request, id: string) {
    const venta: Ventas | boolean = await this.findOne(req, id)
    if (!venta) {
      throw new NotFoundException("No se encontró la venta a eliminar")
    }

    const producto: Productos | boolean = await this.productosService.findOne(req, venta.idProducto.toString())
    if (!producto) {
      throw new BadRequestException("No se pueden devolver las unidades porque el producto ya no existe")
    }

    //Actualizo las unidades del producto
    producto.disponibles = producto.disponibles + venta.unidades
    await this.productosService.productoCambiado(req, venta.idProducto.toString(), { producto })

    //Elimino la venta
    await this.ventasRepository.remove(venta)
    await this.socketService.emitirProductos()
    return { msg: "Venta eliminada" }
  }



  async eliminarTodas(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Ventas> = { where: { creador } }

    const ventas = await this.ventasRepository.find(options)
    if (!ventas.length) {
      return { msg: "No se encontraron ventas a eliminar" }
    }

    await this.ventasRepository.remove(ventas)

    return { msg: "Todos las ventas se eliminaron" }
  }
}
