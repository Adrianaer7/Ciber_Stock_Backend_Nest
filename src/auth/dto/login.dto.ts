import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: "El email tiene que ser válido" })
    email: string;

    @IsNotEmpty({ message: "Ingresa una contraseña válida" })
    password: string;
}