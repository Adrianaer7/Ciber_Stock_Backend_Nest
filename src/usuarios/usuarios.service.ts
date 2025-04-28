import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/create.user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/cambiarPassword.dto';
import { NuevaPasswordDto } from './dto/nuevaPasssord.dto';
import { generarId } from './helpers/generar';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuarios)
    private readonly userRepository: Repository<Usuarios>,
    private emailService: MailService
  ) { }

  async nuevoUsuario(createUsuarioDto: CreateUsuarioDto) {
    //quito la contraseña de usuario
    const { password, ...usuario } = createUsuarioDto
    const token = generarId()
    try {
      //creo instancia
      const nuevoUsuario = this.userRepository.create({
        ...usuario,
        password: bcrypt.hashSync(password, 10),
        token,
        confirmado: false
      })

      //guardo en bd
      await this.userRepository.save(nuevoUsuario)

      //envio mail
      await this.emailService.emailRegistro({
        email: usuario.email,
        nombre: usuario.nombre,
        token
      })

      return { msg: "Usuario creado correctamente. Revise su email para activar su cuenta." }

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`El correo ${createUsuarioDto.email} ya existe`)
      }
      throw new InternalServerErrorException(error);
    }
  }




  async traerTodos() {
    const usuarios = await this.userRepository.find()
    if (!usuarios.length) {
      return { msg: "No existen usuarios creados" }
    } else {
      return usuarios
    }
  }



  async confirmar(token: string) {
    const usuario = await this.userRepository.findOneBy({ token })
    if (!usuario) throw new NotFoundException("El usuario no existe o ya está verificado")

    usuario.confirmado = true
    usuario.token = ""

    await this.userRepository.save(usuario)

    return { msg: `Hola, ${usuario.nombre}. Tu usuario ha sido confirmado` };
  }



  async olvidePassword(changePasswordDto: ChangePasswordDto) {
    const { email } = changePasswordDto

    const usuario = await this.userRepository.findOneBy({ email })
    if (!usuario) throw new NotFoundException("El usuario no existe")

    usuario.token = generarId()

    this.userRepository.save(usuario)

    //envio email
    await this.emailService.emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token
    })

    return { msg: "Se han enviado instrucciones a tu email" }
  }



  async comprobarToken(token: string) {
    const usuario = await this.userRepository.findOneBy({ token })

    if (!usuario) {
      return { msg: false }
    } else {
      return { msg: true }
    }
  }



  async nuevoPassword(token: string, nuevaPasswordDto: NuevaPasswordDto) {
    const { contraseña } = nuevaPasswordDto

    const usuario = await this.userRepository.findOneBy({ token })
    if (!usuario) throw new NotFoundException("Token no válido")

    usuario.password = bcrypt.hashSync(contraseña, 10),
      usuario.token = ""

    this.userRepository.save(usuario)
    return { msg: "Contraseña modificada correctamente" }

  }



  async removeAll(req: Request) {
    //busco usuario
    const _id = req['usuario']._id
    const usuario = await this.userRepository.findOneBy({ _id })

    //valido
    if (!usuario) throw new NotFoundException("Token no válido")

    //elimino
    await this.userRepository.delete(_id)
    return { msg: "El usuario ha sido eliminado" }
  }
}