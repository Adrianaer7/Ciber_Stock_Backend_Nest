import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateDolarDto } from './dto/create-dolare.dto';
import { UpdateDolarDto } from './dto/update-dolar.dto';
import { ObjectId } from 'mongodb';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Dolares } from './entities/dolar.entity';
import { consultarDolar } from 'src/usuarios/helpers/consultarDolar';
import { ProductosService } from 'src/productos/productos.service';


@Injectable()
export class DolaresService {

  constructor(
    @InjectRepository(Dolares)
    private readonly dolaresRepository: Repository<Dolares>,
    @Inject(forwardRef(() => ProductosService))
    private readonly productosService: ProductosService
  ) { }


  async enviarDolar(req: Request, automatico?: boolean) {
    let usd: Dolares = await this.findOne(req)
    if (!usd || usd.automatico || automatico) {
      let valor = await consultarDolar()
      valor.creador = new ObjectId(req['usuario']._id)
      if(usd) {
        Object.assign(usd, valor)
      } else {
        usd = valor
      }
      //edito el precio de todos los productos
      await this.productosService.editarProductos(req, usd.precio)
      const dolar = await this.dolaresRepository.save(usd)
      return dolar
    }

    //si en la bd está manual
    const { _id, ...dolar } = usd

    return dolar
  }

  async findOne(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Dolares> = { where: { creador } }

    const dolar: Dolares = await this.dolaresRepository.findOne(options)

    return dolar
  }



  async editarManualmente(req: Request, updateDolarDto: UpdateDolarDto) {
    const dolar: Dolares = await this.findOne(req)

    if (updateDolarDto.dolarManual) {
      dolar.automatico = false
      dolar.precio = Number(updateDolarDto.dolarManual.precio)
      const elDolar = await this.dolaresRepository.save(dolar)
      await this.productosService.editarProductos(req, dolar.precio)

      return elDolar
    } else {
      //cuando quiero quitar le precio manual
      return await this.enviarDolar(req, true)
    }
  }

  

  async eliminarDolar(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Dolares> = { where: { creador } }

    const dolares = await this.dolaresRepository.find(options)

    await this.dolaresRepository.remove(dolares)
  }



  async eliminarTodos(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options: FindManyOptions<Dolares> = { where: { creador } }

    const dolares = await this.dolaresRepository.find(options)
    if (!dolares.length) {
      return { msg: "No se encontraron dolares a eliminar" }
    }

    await this.dolaresRepository.remove(dolares)

    return { msg: "Todos los dolares se eliminaron" }
  }

}
