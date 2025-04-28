import { Controller, Get, Post, Body, UseGuards, Request, Delete } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) { }

  @UseGuards(AuthGuard)
  @Post()
  crearCompra(@Request() req: RequestConUsuario, @Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.crearCompra(req, createCompraDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  traerCompras(@Request() req: RequestConUsuario) {
    return this.comprasService.traerCompras(req);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodas(@Request() req: RequestConUsuario) {
    return this.comprasService.eliminarTodas(req);
  }
}
