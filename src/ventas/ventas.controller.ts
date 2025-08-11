import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) { }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  agregarVenta(@Request() req: RequestConUsuario, @Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.agregarVenta(req, createVentaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todasVentas(@Request() req: RequestConUsuario) {
    return this.ventasService.todasVentas(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  laVenta(@Request() req: RequestConUsuario, @Param('id') id: string) {
    return this.ventasService.laVenta(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarVenta(@Request() req: RequestConUsuario, @Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.editarVenta(req, id, updateVentaDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarVenta(@Request() req: RequestConUsuario, @Param('id') id: string) {
    return this.ventasService.eliminarVenta(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodas(@Request() req: RequestConUsuario) {
    return this.ventasService.eliminarTodas(req);
  }
}
