import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('rubros')
export class RubrosController {
  constructor(private readonly rubrosService: RubrosService) { }

  @UseGuards(AuthGuard)
  @Post()
  agregarRubro(@Request() req: Request, @Body() createRubroDto: CreateRubroDto) {
    return this.rubrosService.agregarRubro(req, createRubroDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todosRubros(@Request() req: Request) {
    return this.rubrosService.todosRubros(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  elRubro(@Request() req: Request, @Param('id') id: string) {
    return this.rubrosService.elRubro(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarRubro(@Request() req: Request, @Param('id') id: string, @Body() updateRubroDto: UpdateRubroDto) {
    return this.rubrosService.editarRubro(req, id, updateRubroDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarRubro(@Request() req: Request, @Param('id') id: string) {
    return this.rubrosService.eliminarRubro(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodos(@Request() req: Request) {
    return this.rubrosService.eliminarTodos(req);
  }
}
