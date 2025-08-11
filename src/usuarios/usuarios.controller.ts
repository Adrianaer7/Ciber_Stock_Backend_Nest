import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ChangePasswordDto } from './dto/cambiarPassword.dto';
import { NuevaPasswordDto } from './dto/nuevaPasssord.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @UseGuards(ThrottlerGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  nuevoUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.nuevoUsuario(createUsuarioDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  traerTodos() {
    return this.usuariosService.traerTodos();
  }

  @UseGuards(ThrottlerGuard)
  @Get('/confirmar/:token')
  confirmar(@Param('token') token: string) {
    if (!token) {
      throw new BadRequestException('El token no es válido.');
    }
    return this.usuariosService.confirmar(token);
  }

  @Post('/olvide-password')
  olvidePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.usuariosService.olvidePassword(changePasswordDto);
  }

  @UseGuards(ThrottlerGuard)
  @Get('/olvide-password/:token')
  comprobarToken(@Param('token') token: string) {
    if (!token) {
      throw new BadRequestException('El token no es válido.');
    }
    return this.usuariosService.comprobarToken(token);
  }

  @UseGuards(ThrottlerGuard)
  @HttpCode(200)
  @Post('/olvide-password/:token')
  nuevoPassword(@Param('token') token: string, @Body() nuevaPasswordDto: NuevaPasswordDto) {
    return this.usuariosService.nuevoPassword(token, nuevaPasswordDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  removeAll(@Request() req: RequestConUsuario) {
    return this.usuariosService.removeAll(req);
  }
}
