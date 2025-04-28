import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { PorcentajesService } from './porcentajes.service';
import { CreatePorcentajeDto } from './dto/create-porcentaje.dto';
import { UpdatePorcentajeDto } from './dto/update-porcentaje.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('porcentajes')
export class PorcentajesController {
  constructor(private readonly porcentajesService: PorcentajesService) { }

  @UseGuards(AuthGuard)
  @Post()
  agregarPorcentaje(@Request() req: RequestConUsuario, @Body() createPorcentajeDto: CreatePorcentajeDto) {
    return this.porcentajesService.agregarPorcentaje(req, createPorcentajeDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todosPorcentajes(@Request() req: RequestConUsuario) {
    return this.porcentajesService.todosPorcentajes(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  elPorcentaje(@Request() req: RequestConUsuario, @Param('id') id: string) {
    return this.porcentajesService.elPorcentaje(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarPorcentaje(@Request() req: RequestConUsuario, @Param('id') id: string, @Body() updatePorcentajeDto: UpdatePorcentajeDto) {
    return this.porcentajesService.editarPorcentaje(req, updatePorcentajeDto, id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarPorcentaje(@Request() req: RequestConUsuario, @Param('id') id: string) {
    return this.porcentajesService.eliminarPorcentaje(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodos(@Request() req: RequestConUsuario) {
    return this.porcentajesService.eliminarTodos(req);
  }
}
