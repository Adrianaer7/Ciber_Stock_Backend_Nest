import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @UseGuards(AuthGuard) 
  @Post()
  crearCompra(@Request() req: Request, @Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.crearCompra(req, createCompraDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  traerCompras(@Request() req: Request) {
    return this.comprasService.traerCompras(req);
  }
}
