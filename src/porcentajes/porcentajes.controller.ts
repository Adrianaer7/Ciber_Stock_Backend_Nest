import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { PorcentajesService } from './porcentajes.service';
import { CreatePorcentajeDto } from './dto/create-porcentaje.dto';
import { UpdatePorcentajeDto } from './dto/update-porcentaje.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('porcentajes')
export class PorcentajesController {
  constructor(private readonly porcentajesService: PorcentajesService) {}

  @UseGuards(AuthGuard)
  @Post()
  agregarPorcentaje(@Request() req: Request, @Body() createPorcentajeDto: CreatePorcentajeDto) {
    return this.porcentajesService.agregarPorcentaje(req, createPorcentajeDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todosPorcentajes(@Request() req: Request) {
    return this.porcentajesService.todosPorcentajes(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  elPorcentaje(@Request() req: Request, @Param('id') id: string) {
    return this.porcentajesService.elPorcentaje(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarPorcentaje(@Request() req: Request, @Param('id') id: string, @Body() updatePorcentajeDto: UpdatePorcentajeDto) {
    return this.porcentajesService.editarPorcentaje(req, updatePorcentajeDto, id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarPorcentaje(@Request() req: Request, @Param('id') id: string) {
    return this.porcentajesService.eliminarPorcentaje(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodos(@Request() req: Request) {
    return this.porcentajesService.eliminarTodos(req);
  }
}
