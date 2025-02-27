import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @UseGuards(AuthGuard)
  @Post()
  crearProducto(@Request() req: Request, @Body() createProductoDto: CreateProductoDto) {
    return this.productosService.crearProducto(req, createProductoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todosProductos(@Request() req: Request) {
    return this.productosService.todosProductos(req);
  }

  @Get(':id')
  elProducto(@Request() req: Request, @Param('id') id: string) {
    return this.productosService.elProducto(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarUnProducto(@Request() req: Request, @Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.editarUnProducto(req, id, updateProductoDto, true);
  }

  @UseGuards(AuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  editarProductos(@Request() req: Request, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.editarProductos(req, updateProductoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarProducto(@Request() req: Request, @Param('id') id: string) {
    return this.productosService.eliminarProducto(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodos(@Request() req: Request) {
    return this.productosService.eliminarTodos(req);
  }
}
