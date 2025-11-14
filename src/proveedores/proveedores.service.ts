import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { UpdateProveedorDto } from './dto/update-proveedore.dto';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedores } from './entities/proveedor.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { SocketService } from 'src/web-socket/web-socket.service';
import { RequestConUsuario } from 'src/helpers/interfaces';
import { Productos } from 'src/productos/entities/producto.entity';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedores)
    private readonly proveedoresRepository: Repository<Proveedores>,
    private readonly productosService: ProductosService,
    private readonly socketService: SocketService
  ) { }

  async agregarProveedor(req: RequestConUsuario, createProveedoreDto: CreateProveedorDto) {
    const { nombre, empresa, telEmpresa, telPersonal, email } = createProveedoreDto

    const datos = (nombre + empresa + telPersonal + telEmpresa + email).replaceAll(/\s+/g, '')
    const creador = new ObjectId(req.usuario._id)
    const _id = new ObjectId()
    let nuevoProveedor = this.proveedoresRepository.create({
      ...createProveedoreDto,
      _id,
      datos,
      creador
    })

    try {
      const proveedor = await this.proveedoresRepository.save(nuevoProveedor)
      await this.socketService.emitirProductos()
      return { proveedor }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }



  async todosProveedores(req: RequestConUsuario) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Proveedores> = { where: { creador } }
    const proveedores = await this.proveedoresRepository.find(options)
    return { proveedores }
  }



  async elProveedor(req: RequestConUsuario, id: string) {
    const proveedor: Proveedores | boolean = await this.findOne(req, id)
    if (!proveedor) {
      throw new NotFoundException("El proveedor no existe")
    }
    return { proveedor }
  }



  async findOne(req: RequestConUsuario, id: string) {
    if (!ObjectId.isValid(id)) return false

    const _id = new ObjectId(id)
    const creador = new ObjectId(req.usuario._id)

    const options: FindManyOptions<Proveedores> = {
      where: {
        creador,
        _id
      }
    }

    const proveedor: Proveedores = await this.proveedoresRepository.findOne(options)
    if (!proveedor) return false

    return proveedor
  }



  async editarProveedor(req: RequestConUsuario, id: string, updateProveedoreDto: UpdateProveedorDto) {
    const proveedor: Proveedores | boolean = await this.findOne(req, id)

    if (!proveedor) {
      throw new NotFoundException("El proveedor no existe")
    }

    const { nombre, empresa, telEmpresa, telPersonal, email } = updateProveedoreDto

    const creador = new ObjectId(req.usuario._id)
    const _id = new ObjectId(proveedor._id)

    Object.assign(proveedor, updateProveedoreDto)



    //Para asegurarme no guardo los datos que vienen del front
    proveedor._id = _id
    proveedor.creador = creador
    proveedor.datos = (nombre + empresa + telPersonal + telEmpresa + email).replaceAll(/\s+/g, '');


    const provider = await this.proveedoresRepository.save(proveedor)
    await this.socketService.emitirProductos()
    return { proveedor: provider }
  }



  async eliminarProveedor(req: RequestConUsuario, id: string) {
    const proveedor: Proveedores | boolean = await this.findOne(req, id)
    if (!proveedor) {
      throw new NotFoundException("El proveedor no existe")
    }

    const {productos} = await this.productosService.todosProductos(req)

    await this.limpiarProveedor(req, proveedor, productos)

    await this.proveedoresRepository.remove(proveedor)
    await this.socketService.emitirProductos()
    return { msg: "Proveedor eliminado" }
  }



  async eliminarTodos(req: RequestConUsuario) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Proveedores> = { where: { creador } }

    const proveedores = await this.proveedoresRepository.find(options)
    
    if (!proveedores.length) {
      return { msg: "No se encontraron proveedores a eliminar" }
    }
    
    const {productos} = await this.productosService.todosProductos(req)
    const productosConProveedores = productos.filter(p => p.todos_proveedores.length > 0)
    for (const proveedor of proveedores) {
      await this.limpiarProveedor(req, proveedor, productosConProveedores)
    }

    await this.proveedoresRepository.remove(proveedores)

    return { msg: "Todos los proveedores se eliminaron" }
  }



  async limpiarProveedor(req: RequestConUsuario, proveedor: Proveedores, productos: Productos[]) {
    for (const producto of productos) {
      if(producto.proveedor == proveedor._id.toString()) {  //si coincide con el seleccionado por default
        const encontro = producto.todos_proveedores.find(p => p !== producto.proveedor) //busco otro proveedor para poner como default
        if(encontro) {
          producto.proveedor = encontro
        } else {
          producto.proveedor = ''
        }
      }
      producto.todos_proveedores = producto.todos_proveedores.filter(p => p !== proveedor._id.toString()) //elimino de la lista de todos los proveedores
      await this.productosService.editarUnProducto(req, producto._id.toString(), { producto })
      
    }
  }
}
