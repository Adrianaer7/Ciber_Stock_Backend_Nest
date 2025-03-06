import { Controller, Get, Param, UseGuards, Request, Put } from '@nestjs/common';
import { FaltantesService } from './faltantes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('faltantes')
export class FaltantesController {
  constructor(private readonly faltantesService: FaltantesService) {}

  @UseGuards(AuthGuard)
  @Get()
  todosFaltantes(@Request() req: Request) {
    return this.faltantesService.todosFaltantes(req);
  }
  
  @UseGuards(AuthGuard)
  @Put(':id')
  crearFaltante(@Request() req: Request, @Param() id: string) {
    return this.faltantesService.crearFaltante(req, id);
  }
}
