import { Controller, Get, Body, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { DolaresService } from './dolares.service';
import { UpdateDolarDto } from './dto/update-dolar.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('dolares')
export class DolaresController {
  constructor(private readonly dolaresService: DolaresService) { }

  @UseGuards(AuthGuard)
  @Get()
  enviarDolar(@Request() req: RequestConUsuario) {
    return this.dolaresService.enviarDolar(req);
  }

  @UseGuards(AuthGuard)
  @Put()
  editarManualmente(@Request() req: RequestConUsuario, @Body() updateDolarDto: UpdateDolarDto) {
    return this.dolaresService.editarManualmente(req, updateDolarDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodos(@Request() req: RequestConUsuario) {
    return this.dolaresService.eliminarTodos(req);
  }

}
