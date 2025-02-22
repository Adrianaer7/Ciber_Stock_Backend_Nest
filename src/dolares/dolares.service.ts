import { Injectable } from '@nestjs/common';
import { CreateDolarDto } from './dto/create-dolare.dto';
import { UpdateDolarDto } from './dto/update-dolar.dto';
import { ObjectId } from 'mongodb';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Dolares } from './entities/dolar.entity';
import { consultarDolar } from 'src/usuarios/helpers/consultarDolar';


@Injectable()
export class DolaresService {

  constructor(
    @InjectRepository(Dolares)
    private readonly dolaresRepository: Repository<Dolares>
  ) { }

  async traerDolar(req: Request, createDolarDto: CreateDolarDto) {
    const creador = new ObjectId(req['usuario']._id)

    const dolar: Dolares = await this.findOne(req)
    if (dolar) {
      if (dolar.precio === createDolarDto.precio) {
        return dolar
      } else {
        this.eliminarDolar(req)
      }
    }

    const nuevoDolar = this.dolaresRepository.create({
      ...createDolarDto,
      creador
    })

    return await this.dolaresRepository.save(nuevoDolar)
  }






  async findOne(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Dolares> = { where: { creador } }

    const dolar: Dolares = await this.dolaresRepository.findOne(options)

    return dolar
  }



  async enviarDolar(req: Request) {
    const usd: Dolares = await this.findOne(req)
    if (!usd) {
      let valor = await consultarDolar()
      valor.creador = new ObjectId(req['usuario']._id)
      let dolar: any = []
      const res = await this.dolaresRepository.save(valor)
      dolar.push(res)
      return {dolar}
    }

    const { _id, ...dolar } = usd

    return {dolar}
  }



  async editarManualmente(req: Request, updateDolarDto: UpdateDolarDto) {
    const dolar: Dolares = await this.findOne(req)

    if (updateDolarDto.dolarManual) {
      dolar.automatico = false
      dolar.precio = Number(updateDolarDto.dolarManual.precio)
      return await this.dolaresRepository.save(dolar)
    } else {
      dolar.automatico = true
      return await this.dolaresRepository.save(dolar)
    }
  }


  async eliminarDolar(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Dolares> = { where: { creador } }

    const dolares = await this.dolaresRepository.find(options)

    await this.dolaresRepository.remove(dolares)
  }

}
