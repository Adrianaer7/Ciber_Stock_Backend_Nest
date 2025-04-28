import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { GarantiasService } from './garantias.service';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('garantias')
export class GarantiasController {
  constructor(private readonly garantiasService: GarantiasService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req: RequestConUsuario, @Body() createGarantiaDto: CreateGarantiaDto) {
    return this.garantiasService.crearGarantia(req, createGarantiaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  traerGarantias(@Request() req: RequestConUsuario) {
    return this.garantiasService.traerGarantias(req);
  }
}
