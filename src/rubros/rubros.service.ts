import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubros } from './entities/rubro.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Productos } from 'src/productos/entities/producto.entity';
import { ProductosService } from 'src/productos/productos.service';
import { UpdateProductoDto } from 'src/productos/dto/update-producto.dto';

@Injectable()
export class RubrosService {

  constructor(
    @InjectRepository(Rubros)
    private readonly rubrosRepository: Repository<Rubros>,
    @InjectRepository(Productos)
    private readonly productosRepository: Repository<Productos>,
    private readonly productosService: ProductosService
  ) {}

  async agregarRubro(req: Request, createRubroDto: CreateRubroDto) {
    const creador = new ObjectId(req['usuario']._id)
      
    const nuevoRubro = this.rubrosRepository.create({
      ...createRubroDto,
      rentabilidad: Number(createRubroDto.rentabilidad),
      creador
    })

    try {
      const rubro =  await this.rubrosRepository.save(nuevoRubro)
      return {rubro}
    } catch (error) {
      if( error.code === 11000 ) {
        throw new BadRequestException(`El rubro ya existe`)
      }
      throw new InternalServerErrorException(error);
    }

  }



  async todosRubros(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options : FindManyOptions<Rubros> = {where: {creador}}
    const rubros = await this.rubrosRepository.find(options)
    return {rubros}
  }



  async elRubro(req: Request, id: string) {
    const rubro: Rubros | boolean = await this.findOne(req, id)
    if(!rubro) {
      return {msg: "El rubro no existe"}
    }

    return {rubro}
  }



  async findOne(req: Request, id: string) {
    if(!ObjectId.isValid(id)) return false

    const _id = new ObjectId(id)      
    const creador = new ObjectId(req['usuario']._id)
    
    const options : FindManyOptions<Rubros> = {
      where: {
        creador,
        _id
      }
    }
    
    const proveedor: Rubros = await this.rubrosRepository.findOne(options)
    if(!proveedor) return false

    return proveedor
  }



  async editarRubro(req: Request, id: string,  updateRubroDto: UpdateRubroDto) {
    const rubro: Rubros | boolean = await this.findOne(req, id)
    if(!rubro) {
      return {msg: "El rubro no existe"}
    }

    const creador = new ObjectId(req['usuario']._id)
    const _id = new ObjectId(rubro._id)

    Object.assign(rubro, updateRubroDto)

    //Para asegurarme no guardo los datos que vienen del front
    updateRubroDto._id = _id
    updateRubroDto.creador = creador

    //Busco productos que tengan el nombre del rubro y los actualizo
    const options : FindManyOptions<Productos> = { where: {creador, rubro: updateRubroDto.nombre} }
    const productos: Productos[] = await this.productosRepository.find(options)

    if(productos.length) {
      for(const producto of productos) {
        const {precio_venta, precio_compra_dolar, precio_compra_peso, valor_dolar_compra} = producto
  
        producto.rubroValor = updateRubroDto.rentabilidad
  
        if(precio_compra_dolar && precio_venta > 0) {
          producto.precio_venta = (precio_compra_dolar * valor_dolar_compra) * (1 + updateRubroDto.rentabilidad / 100);
        }
        if(precio_compra_peso && precio_venta > 0) {
          producto.precio_venta = (precio_compra_peso * valor_dolar_compra) * (1 + updateRubroDto.rentabilidad / 100);
        }
        this.productosService.productoCambiado(req, id, {producto})
      }
    }

    const category =  await this.rubrosRepository.save(updateRubroDto)
    return {rubro: category}
  }



  async eliminarRubro(req: Request, id: string) {
    const rubro: Rubros | boolean = await this.findOne(req, id)
    if(!rubro) {
      return {msg: "El rubro no existe"}
    }

    await this.rubrosRepository.remove(rubro)
    return {msg: "Rubro eliminado"} 
  }



  async eliminarTodos(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options : FindManyOptions<Rubros> = { where: {creador} }

    const rubros = await this.rubrosRepository.find(options)
    if(!rubros.length) {
      return {msg: "No se encontraron rubros a eliminar"}
    }

    await this.rubrosRepository.remove(rubros)

    return {msg:"Todos los rubros se eliminaron"}  
  }
  
}
