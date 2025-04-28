import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CodigosService } from './codigos.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('codigos')
export class CodigosController {
  constructor(private readonly codigosService: CodigosService) { }

  @UseGuards(AuthGuard)
  @Get()
  todosCodigos(@Request() req: RequestConUsuario) {
    return this.codigosService.todosCodigos(req);
  }

}
