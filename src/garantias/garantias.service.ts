import { Injectable } from '@nestjs/common';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { ObjectId } from 'mongodb';
import { FindManyOptions, Repository } from 'typeorm';
import { Garantias } from './entities/garantia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosService } from 'src/productos/productos.service';
import { Productos } from 'src/productos/entities/producto.entity';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Injectable()
export class GarantiasService {

  constructor(
    @InjectRepository(Garantias) private readonly garantiasRepository: Repository<Garantias>,
    private readonly productosService: ProductosService
  ) { }

  async crearGarantia(req: RequestConUsuario, createGarantiaDto: CreateGarantiaDto) {
    const { codigo, garantia, proveedor } = createGarantiaDto

    const producto: Productos | boolean = await this.productosService.findOneByCode(req, createGarantiaDto.codigo)
    if (producto) {
      const laGarantia: Garantias | boolean = await this.findOneByProductId(req, producto._id)
      const creador = new ObjectId(req.usuario._id)

      //si no existe una garantia con el id del producto, creo una nueva
      if (!laGarantia) {
        const nuevaGarantia = new Garantias()
        nuevaGarantia._id = new ObjectId()
        nuevaGarantia.idProducto = producto._id,
        nuevaGarantia.codigo = codigo,
        nuevaGarantia.creador = creador
        nuevaGarantia.detalles = [{
          caducidad: garantia.toUpperCase(),
          proveedor
        }]
        return await this.garantiasRepository.save(nuevaGarantia)

      } else {
        const { detalles } = laGarantia
        const indice = detalles.map(detalle => detalle.proveedor).indexOf(proveedor)    //si el proveedor que traigo del body es el mismo que está en el detalle, devuelvo su posicion en el array de detalles, sino devuelvo -1
        let detalle = {
          caducidad: garantia.toUpperCase(),
          proveedor
        }
        //si no existe el proveedor, añado el nuevo proveedor a la garantia
        if (indice < 0) {
          laGarantia.detalles.push(detalle)
          return await this.garantiasRepository.save(laGarantia)
        } else {
          //si existe, solo lo reemplazo con lo nuevo del body
          laGarantia.detalles[indice].caducidad = garantia.toUpperCase()
          return await this.garantiasRepository.save(laGarantia)
        }
      }
    }
  }

  async findOneByProductId(req: RequestConUsuario, idProducto: ObjectId) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Garantias> = {
      where: {
        creador,
        idProducto
      }
    }

    const garantia: Garantias = await this.garantiasRepository.findOne(options)
    if (!garantia) return false

    return garantia
  }



  async traerGarantias(req: RequestConUsuario) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Garantias> = { where: { creador } }
    const garantias = await this.garantiasRepository.find(options)
    return { garantias }
  }

  async eliminarTodas(req: RequestConUsuario) {
    const creador = new ObjectId(req.usuario._id)
    const options: FindManyOptions<Garantias> = { where: { creador } }

    const productos = await this.garantiasRepository.find(options)
    if (!productos.length) {
      return { msg: "No se encontraron garantias a eliminar" }
    }

    await this.garantiasRepository.remove(productos)

    return { msg: "Todos las garantias se eliminaron" }
  }
}
