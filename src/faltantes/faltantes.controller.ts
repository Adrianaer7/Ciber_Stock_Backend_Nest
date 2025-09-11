import { Controller, Get, Param, UseGuards, Request, Put } from '@nestjs/common';
import { FaltantesService } from './faltantes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('faltantes')
export class FaltantesController {
  constructor(private readonly faltantesService: FaltantesService) { }

  @UseGuards(AuthGuard)
  @Get()
  todosFaltantes(@Request() req: RequestConUsuario) {
    return this.faltantesService.todosFaltantes(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  crearFaltante(@Request() req: RequestConUsuario, @Param() id: string) {
    return this.faltantesService.crearFaltante(req, id);
  }
}
