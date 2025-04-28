import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @UseGuards(AuthGuard)
  @Post()
  crearProducto(@Request() req: RequestConUsuario, @Body() createProductoDto: CreateProductoDto) {
    return this.productosService.crearProducto(req, createProductoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todosProductos(@Request() req: RequestConUsuario) {
    return this.productosService.todosProductos(req);
  }

  @Get(':id')
  elProducto(@Request() req: RequestConUsuario, @Param('id') id: string) {
    return this.productosService.elProducto(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarUnProducto(@Request() req: RequestConUsuario, @Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.editarUnProducto(req, id, updateProductoDto, true);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarProducto(@Request() req: RequestConUsuario, @Param('id') id: string) {
    return this.productosService.eliminarProducto(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodos(@Request() req: RequestConUsuario) {
    return this.productosService.eliminarTodos(req);
  }
}
