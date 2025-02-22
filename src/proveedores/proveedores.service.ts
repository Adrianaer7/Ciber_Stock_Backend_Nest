import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { UpdateProveedorDto } from './dto/update-proveedore.dto';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedores } from './entities/proveedor.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedores)
    private readonly proveedoresRepository: Repository<Proveedores>
  ) { }

  async agregarProveedor(req: Request, createProveedoreDto: CreateProveedorDto) {
    const { nombre, empresa, telEmpresa, telPersonal, email } = createProveedoreDto

    const datos = (nombre + empresa + telPersonal + telEmpresa + email).replace(/\s\s+/g, ' ').replace(/\s+/g, '')
    const creador = new ObjectId(req['usuario']._id)

    let nuevoProveedor = this.proveedoresRepository.create({
      ...createProveedoreDto,
      datos,
      creador
    })

    try {
      const proveedor = await this.proveedoresRepository.save(nuevoProveedor)
      return {proveedor}
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }



  async todosProveedores(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Proveedores> = { where: { creador } }
    const proveedores = await this.proveedoresRepository.find(options)
    return {proveedores}
  }



  async elProveedor(req: Request, id: string) {
    const proveedor: Proveedores | boolean = await this.findOne(req, id)
    if (!proveedor) {
      return { msg: "El proveedor no existe" }
    }
    return {proveedor}
  }



  async findOne(req: Request, id: string) {
    if (!ObjectId.isValid(id)) return false

    const _id = new ObjectId(id)
    const creador = new ObjectId(req['usuario']._id)

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



  async editarProveedor(req: Request, id: string, updateProveedoreDto: UpdateProveedorDto) {
    const proveedor: Proveedores | boolean = await this.findOne(req, id)

    if (!proveedor) {
      return { msg: "Proveedor no existe" }
    }

    const creador = new ObjectId(req['usuario']._id)
    const _id = new ObjectId(proveedor._id)

    Object.assign(proveedor, updateProveedoreDto)

    //Para asegurarme no guardo los datos que vienen del front
    updateProveedoreDto._id = _id
    updateProveedoreDto.creador = creador

    const provider =  this.proveedoresRepository.save(updateProveedoreDto)
    return {proveedor: provider}
  }



  async eliminarProveedor(req: Request, id: string) {
    const proveedor: Proveedores | boolean = await this.findOne(req, id)
    if (!proveedor) {
      return { msg: "El proveedor no existe" }
    }

    await this.proveedoresRepository.remove(proveedor)
    return { msg: "Proveedor eliminado" }
  }



  async eliminarTodos(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Proveedores> = { where: { creador } }

    const proveedores = await this.proveedoresRepository.find(options)
    if (!proveedores.length) {
      return { msg: "No se encontraron proveedores a eliminar" }
    }

    await this.proveedoresRepository.remove(proveedores)

    return { msg: "Todos los proveedores se eliminaron" }
  }
}
