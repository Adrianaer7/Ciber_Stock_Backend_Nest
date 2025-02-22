import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CodigosService } from './codigos.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('codigos')
export class CodigosController {
  constructor(private readonly codigosService: CodigosService) {}

  @UseGuards(AuthGuard)
  @Get()
  todosCodigos(@Request() req: Request) {
    return this.codigosService.todosCodigos(req);
  }

}
