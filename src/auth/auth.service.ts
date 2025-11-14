import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from '../usuarios/entities/create.user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/helpers/interfaces';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly userRepository: Repository<Usuarios>,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    //valido usuario
    const usuario = await this.userRepository.findOneBy({ email })

    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }

    //valido password
    if (!bcrypt.compareSync(password, usuario.password)) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    //valido confirmacion
    if (!usuario.confirmado) {
      throw new UnauthorizedException('Tu cuenta no ha sido confirmada');
    }

    //cargo token para el front       
    usuario.token = this.generarJWT({ id: usuario._id.toString() })

    //quito algunas propiedades
    const { password: _, confirmado, createAt, updateAt, ...user } = usuario

    return user

  }



  async findUserById(id: string) {
    const _id = new ObjectId(id)  //el id que viene del jwt
    const usuario = await this.userRepository.findOneBy({ _id });
    return usuario;
  }



  generarJWT(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}