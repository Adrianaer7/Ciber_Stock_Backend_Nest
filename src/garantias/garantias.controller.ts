import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GarantiasService } from './garantias.service';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('garantias')
export class GarantiasController {
  constructor(private readonly garantiasService: GarantiasService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req: Request, @Body() createGarantiaDto: CreateGarantiaDto) {
    return this.garantiasService.crearGarantia(req, createGarantiaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  traerGarantias(@Request() req: Request) {
    return this.garantiasService.traerGarantias(req);
  }
}
