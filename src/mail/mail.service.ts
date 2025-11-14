import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { environments } from 'src/environments/environment';


@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async emailRegistro(datos) {
        const { nombre, email, token } = datos

        this.mailerService.sendMail({
            from: '"Stock - Ciber infotel" <adrianaerrc7@gmail.com>',
            to: email,
            subject: "Stock Ciber - Confirma tu cuenta",
            text: "Comprueba tu cuenta",
            html: ` 
            <h1>Hola, ${nombre}. Confirma tu cuenta</h1>
            <p>Tu cuenta está casi lista, solo debes comprobarla en el siguiente enlace: 
                <a href="${environments.FRONTEND_URL}/confirmar/${token}">COMPROBAR CUENTA</a>
            </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje.</p>
            <style>
                h1,p,a {font-family: Arial}
                a {color: white; background-color: red; list-style: none; font-weight: 700; line-height: 1.6; margin-top: 10px; width: auto; padding: 5px; margin-left: 5px}
                h1 {text-size: 25px}
            </style>
            `
        })
    }



    async emailOlvidePassword(datos) {
        const { email, nombre, token } = datos
        this.mailerService.sendMail({
            from: '"Stock - Ciber infotel" <correo@correo.com>',
            to: email,
            subject: "Stock Ciber - Reestablece tu contraseña",
            text: "Comprueba tu cuenta",
            html: ` 
              <h1>Hola, ${nombre}. Has solicitado reestablecer tu contraseña</h1>
              <p>Clickea en el siguiente enlace para cambiar tu contraseña: 
                <a href="${environments.FRONTEND_URL}/olvide-password/${token}">REESTABLECER CONTRASEÑA</a>
              </p>
              <p>Si tu no solicitaste el cambio de contraseña, ignora este mensaje.</p>
              <style>
                h1,p,a {font-family: Arial}
                a {color: white; background-color: red; list-style: none; font-weight: 700; line-height: 1.6; margin-top: 10px; width: auto; padding: 5px; margin-left: 5px}
                h1 {text-size: 25px}
              </style>
            `
        })
    }
}
