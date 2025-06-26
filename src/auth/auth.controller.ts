import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RequestConUsuario } from 'src/helpers/interfaces';
import { environments } from 'src/environments/environment';

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
  @HttpCode(HttpStatus.OK)
  usuarioAutenticado(@Request() req: RequestConUsuario, @Res() res: Response) { //si importo @Res tengo que usarlo si o si
    const usuario = req.usuario
    if(req.headers['origin'] == environments.FRONTEND_URL2) { //si me llega de react
      return res.json({ usuario })
    }

    //si me llega de angular
    res.set({
      'x-usuario-id': usuario._id.toString(), //normalmente se pone x- al ser headers personalizados -- configurar el corsConfig para que acepte esto
      'x-usuario-email': usuario.email,
      'x-usuario-nombre': encodeURIComponent(usuario.nombre)  //para que me "escape" los caracteres raros que pueda tener el nombre
    });
    return res.send() //utilizo .send() en vez de .json() por que utilizo res.set()
  }
}
