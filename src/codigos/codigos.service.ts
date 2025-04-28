import { Injectable } from '@nestjs/common';
import { RequestConUsuario } from 'src/helpers/interfaces';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class CodigosService {
  constructor(private readonly productosService: ProductosService) { }

  async todosCodigos(req: RequestConUsuario) {
    const { productos } = await this.productosService.todosProductos(req)
    const codigos = productos.map(producto => producto.codigo)
    let listado = []
    for (let i = 1; i < 1000; i++) {
      listado.push(i)
    }

    const codigosDisponibles = listado.filter(lista => !codigos.includes(lista))
    return { codigosDisponibles }
  }
}
