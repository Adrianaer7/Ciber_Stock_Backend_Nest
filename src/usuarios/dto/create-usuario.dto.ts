import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsString({ message: "El nombre tiene que ser válido" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    nombre: string;

    @IsNotEmpty({ message: "El email es obligatorio" })
    @IsEmail({}, { message: "El email tiene que ser válido" })
    email: string;

    @MinLength(6, { message: "Contraseña mínima 6 caracteres" })
    password: string;
}
