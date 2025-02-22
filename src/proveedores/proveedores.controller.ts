import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { UpdateProveedorDto } from './dto/update-proveedore.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @UseGuards(AuthGuard)
  @Post()
  agregarProveedor(@Request() req: Request, @Body() createProveedoreDto: CreateProveedorDto) {
    return this.proveedoresService.agregarProveedor(req, createProveedoreDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  todosProveedores(@Request() req: Request) {
    return this.proveedoresService.todosProveedores(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  elProveedor(@Request() req: Request, @Param('id') id: string) {
    return this.proveedoresService.elProveedor(req, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editarProveedor(@Request() req: Request, @Param('id') id: string, @Body() updateProveedoreDto: UpdateProveedorDto) {
    return this.proveedoresService.editarProveedor(req, id, updateProveedoreDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarProveedor(@Request() req: Request, @Param('id') id: string) {
    return this.proveedoresService.eliminarProveedor(req, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  eliminarTodos(@Request() req: Request) {
    return this.proveedoresService.eliminarTodos(req);
  }
}
