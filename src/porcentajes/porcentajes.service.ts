import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePorcentajeDto } from './dto/create-porcentaje.dto';
import { UpdatePorcentajeDto } from './dto/update-porcentaje.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Porcentajes } from './entities/porcentajes.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Productos } from 'src/productos/entities/producto.entity';

@Injectable()
export class PorcentajesService {
  constructor(
    @InjectRepository(Porcentajes) private readonly porcentajesRepository: Repository<Porcentajes>
  ) { }

  agregarPorcentaje(req: Request, createPorcentajeDto: CreatePorcentajeDto) {
    const creador = new ObjectId(req['usuario']._id)
    const nuevoPorcentaje = this.porcentajesRepository.create({
      ...createPorcentajeDto,
      creador
    })

    return this.porcentajesRepository.save(nuevoPorcentaje)
  }



  async todosPorcentajes(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Porcentajes> = { where: { creador } }
    const porcentajes = await this.porcentajesRepository.find(options)
    return { porcentajes }
  }



  async elPorcentaje(req: Request, id: string) {
    const porcentaje: Porcentajes | boolean = await this.findOne(req, id)
    if (!porcentaje) {
      throw new NotFoundException("El porcentaje no existe")
    }

    return { porcentaje }
  }

  async findOne(req: Request, id: string) {
    if (!ObjectId.isValid(id)) return false

    const _id = new ObjectId(id)
    const creador = new ObjectId(req['usuario']._id)

    const options: FindManyOptions<Porcentajes> = {
      where: {
        creador,
        _id
      }
    }

    const porcentaje: Porcentajes = await this.porcentajesRepository.findOne(options)
    if (!porcentaje) return false

    return porcentaje
  }

  async findOneBy(req: Request, tipo: string) {

    const creador = new ObjectId(req['usuario']._id)

    const options: FindManyOptions<Porcentajes> = {
      where: {
        creador,
        tipo
      }
    }

    const porcentaje: Porcentajes = await this.porcentajesRepository.findOne(options)

    return porcentaje
  }

  async editarPorcentaje(req: Request, updatePorcentajeDto: UpdatePorcentajeDto, id: string) {
    const porcentaje: Porcentajes | boolean = await this.findOne(req, id)
    if (!porcentaje) {
      throw new NotFoundException("El porcentaje no existe")
    }

    const creador = new ObjectId(req['usuario']._id)
    const _id = new ObjectId(porcentaje._id)

    Object.assign(porcentaje, updatePorcentajeDto)
    updatePorcentajeDto._id = _id
    updatePorcentajeDto.creador = creador


    const percentaje = await this.porcentajesRepository.save(updatePorcentajeDto)
    return { porcentaje: percentaje }
  }



  async eliminarPorcentaje(req: Request, id: string) {
    const porcentaje: Porcentajes | boolean = await this.findOne(req, id)
    if (!porcentaje) {
      throw new NotFoundException("El porcentaje no existe")
    }

    await this.porcentajesRepository.remove(porcentaje)
    return { msg: "Porcentaje eliminado" }
  }

  async eliminarTodos(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Porcentajes> = { where: { creador } }

    const porcentaje = await this.porcentajesRepository.find(options)
    if (!porcentaje.length) {
      return { msg: "No se encontraron porcentajes a eliminar" }
    }

    await this.porcentajesRepository.remove(porcentaje)

    return { msg: "Todos los porcentajes se eliminaron" }
  }
}
