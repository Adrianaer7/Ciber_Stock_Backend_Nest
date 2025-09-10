import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('rubros')
export class RubrosController {
  constructor(private readonly rubrosService: RubrosService) { }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  agregarRubro(@Request() req: RequestConUsuario, @Body() createRubroDto: CreateRubroDto) {
    return this.rubrosService.agregarRubro(req, createRubroDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todosRubros(@Request() req: RequestConUsuario) {
    return this.rubrosService.todosRubros(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  elRubro(@Request() req: RequestConUsuario, @Param('id') id: string) {
    return this.rubrosService.elRubro(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarRubro(@Request() req: RequestConUsuario, @Param('id') id: string, @Body() updateRubroDto: UpdateRubroDto) {
    return this.rubrosService.editarRubro(req, id, updateRubroDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarRubro(@Request() req: RequestConUsuario, @Param('id') id: string) {
    return this.rubrosService.eliminarRubro(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodos(@Request() req: RequestConUsuario) {
    return this.rubrosService.eliminarTodos(req);
  }
}
