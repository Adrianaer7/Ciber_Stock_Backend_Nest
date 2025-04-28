import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/productos.service';
import { Productos } from 'src/productos/entities/producto.entity';
import { SocketService } from 'src/web-socket/web-socket.service';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Injectable()
export class FaltantesService {

  constructor(
    private readonly productosService: ProductosService,
    private readonly socketService: SocketService
  ) { }

  async crearFaltante(req: RequestConUsuario, id: string) {
    const product: Productos | boolean = await this.productosService.findOne(req, id)
    if (!product) {
      throw new NotFoundException("El producto no existe")
    }
    if (!product.faltante) {
      product.faltante = true;
      product.limiteFaltante = product.disponibles;
      product.añadirFaltante = true;
      const producto = await this.productosService.editarUnProducto(req, id, { producto: product })
      await this.socketService.emitirProductos()
      return producto
    } else {
      return await this.eliminarFaltante(req, id, product)
    }

  }

  async eliminarFaltante(req: RequestConUsuario, id: string, product: Productos) {
    product.faltante = false
    product.limiteFaltante = 0
    product.añadirFaltante = false
    const producto = await this.productosService.editarUnProducto(req, id, { producto: product })
    await this.socketService.emitirProductos()
    return producto
  }



  async todosFaltantes(req: RequestConUsuario) {
    const faltantes = await this.productosService.todosProductosFaltantes(req)
    return { faltantes }
  }

}