import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RequestConUsuario, Usuario } from 'src/helpers/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(ThrottlerGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  usuarioAutenticado(@Request() req: RequestConUsuario) {
    return {usuario: req.usuario}
  }
}
