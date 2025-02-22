import { Injectable } from '@nestjs/common';
import { ProductosService } from 'src/productos/productos.service';
import { Productos } from 'src/productos/entities/producto.entity';
import { ObjectId } from 'mongodb';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class FaltantesService {

  constructor(private readonly productosService: ProductosService) {}

  async crearFaltante(req: Request, id: string) {
    const product: Productos | boolean = await this.productosService.findOne(req, id)
    if (!product) {
      return { msg: "El producto no existe" }
    }
    if(!product.faltante) {
      product.faltante = true;
      product.limiteFaltante = product.disponibles;
      product.añadirFaltante = true;
      const producto = await this.productosService.editarUnProducto(req, id, {producto: product})
      return producto
    } else {
      return await this.eliminarFaltante(req, id, product)
    }

  }
  
  async eliminarFaltante(req: Request, id: string, producto: Productos) {
    producto.faltante = false
    producto.limiteFaltante = 0
    producto.añadirFaltante = false
    return await this.productosService.editarUnProducto(req, id, {producto})
  }
  


  async todosFaltantes(req: Request) {
    const faltantes = await this.productosService.todosProductosFaltantes(req)
    return {faltantes}
  }

}