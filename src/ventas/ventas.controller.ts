import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @UseGuards(AuthGuard)
  @Post()
  agregarVenta(@Request() req: Request , @Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.agregarVenta(req, createVentaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todasVentas(@Request() req: Request) {
    return this.ventasService.todasVentas(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  laVenta(@Request() req: Request, @Param('id') id: string) {
    return this.ventasService.laVenta(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarVenta(@Request() req: Request, @Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.editarVenta(req, id, updateVentaDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarVenta(@Request() req: Request, @Param('id') id: string) {
    return this.ventasService.eliminarVenta(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodas(@Request() req: Request) {
    return this.ventasService.eliminarTodas(req);
  }
}
