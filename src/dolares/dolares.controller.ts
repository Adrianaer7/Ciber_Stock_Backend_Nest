import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { DolaresService } from './dolares.service';
import { CreateDolarDto } from './dto/create-dolare.dto';
import { UpdateDolarDto } from './dto/update-dolar.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('dolares')
export class DolaresController {
  constructor(private readonly dolaresService: DolaresService) {}

  @UseGuards(AuthGuard)
  @Post()
  traerDolar(@Request() req: Request, @Body() createDolarDto: CreateDolarDto) {
    return this.dolaresService.traerDolar(req, createDolarDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  enviarDolar(@Request() req: Request) {
    return this.dolaresService.enviarDolar(req);
  }

  @UseGuards(AuthGuard)
  @Put()
  editarManualmente(@Request() req: Request, @Body() updateDolarDto: UpdateDolarDto) {
    return this.dolaresService.editarManualmente(req, updateDolarDto);
  }

}
