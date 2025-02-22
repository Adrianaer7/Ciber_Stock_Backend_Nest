import { Injectable } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { ObjectId } from 'mongodb';
import { Compras } from './entities/compra.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Productos } from 'src/productos/entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class ComprasService {

  constructor(
    @InjectRepository(Compras)
    private readonly comprasRepository: Repository<Compras>,
    private readonly productosService: ProductosService

  ) { }

  async crearCompra(req: Request, createCompraDto: CreateCompraDto) {
    const creador = new ObjectId(req['usuario']._id)
    let arsAdolar: string

    const {nombre, marca, modelo, codigo, precio_compra_dolar, precio_compra_peso, valor_dolar_compra, proveedor, garantia, factura, barras, fecha_compra, notas} = createCompraDto.producto


    const producto: Productos | boolean = await this.productosService.findOneByCode(req, codigo)
    if(!producto) {
      return {msg: "Producto no encontrado"}
    }

    const compra: Compras | boolean = await this.findOne(req, producto._id.toString())

    if(precio_compra_peso > 0) {
      arsAdolar = (precio_compra_peso / valor_dolar_compra ).toFixed(2)
    }

    if(!compra && createCompraDto.cantidad) { //si a ese producto nunca se le hizo una compra y traigo una cantidad, agrego el producto entero
      //creo el objeto a agregar con lo que me llega del front
      const laCompra = { 
        idProducto: producto._id,
        nombre, 
        marca, 
        modelo, 
        codigo,
        historial: [],
        descripcion: (nombre + marca + modelo  + barras + factura + notas).replace(/\s\s+/g, ' ').replace(/\s+/g, ''),
        creador,
        creado: new Date()
      }
      laCompra.historial.push({
        cantidad: createCompraDto.cantidad, 
        fecha_compra, precio_compra_dolar, 
        arsAdolar, 
        valor_dolar_compra, 
        proveedor, 
        barras, 
        factura, 
        garantia
      })

      return this.comprasRepository.save(laCompra)
    } 

    if (compra && createCompraDto.cantidad ) {    //si existe el producto en el listado de compras y la cantidad es mayora a 0, edito el producto entero
      const compraPasada: Compras = compra //guardo el primer y unico objeto coincidente
      const datos = {cantidad: createCompraDto.cantidad, fecha_compra, precio_compra_dolar, arsAdolar, valor_dolar_compra, proveedor, barras, factura, garantia}
      compraPasada.nombre = nombre
      compraPasada.marca = marca
      compraPasada.modelo = modelo
      compraPasada.historial.push(datos)
      compraPasada.descripcion = (nombre + marca + modelo  + barras + factura + notas).replace(/\s\s+/g, ' ').replace(/\s+/g, '')
      compraPasada.creado =  new Date()

      return this.comprasRepository.save(compraPasada)
    }

    if(compra && !createCompraDto.cantidad ) {   //si el producto existe en el listado de compras y no existe cantidad, es porque se modifico algun otro campo del objeto, entonces guardo solo lo modificado
      const compraPasada: Compras = compra
      compraPasada.nombre = nombre
      compraPasada.marca = marca
      compraPasada.modelo = modelo
      compraPasada.descripcion = (nombre + marca + modelo  + barras + factura + notas).replace(/\s\s+/g, ' ').replace(/\s+/g, '')

      return this.comprasRepository.save(compraPasada)
  }


  }

  async findOne(req: Request, id: string) {
    if (!ObjectId.isValid(id)) return false
    
    const _id = new ObjectId(id)
    const creador = new ObjectId(req['usuario']._id)

    const options: FindManyOptions<Compras> = {
      where: {
        creador,
        _id
      }
    }

    const compra: Compras = await this.comprasRepository.findOne(options)
    if (!compra) return false

    return compra
  }

  
  async traerCompras(req: Request) {
    const creador = new ObjectId(req['usuario']._id)
    const options : FindManyOptions<Compras> = {
      where: {
        creador
      },
      order: {
        creado: "DESC"
      }
    }
    let todas = await this.comprasRepository.find(options)
    todas = todas.map(compras => compras.historial.sort((a,b) => a.fecha_compra > b.fecha_compra ? 1 : -1) && compras )
    return {todas}
  }

}
