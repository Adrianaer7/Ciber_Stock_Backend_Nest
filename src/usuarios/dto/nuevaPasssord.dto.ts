import { MinLength } from "class-validator";

export class NuevaPasswordDto {
    @MinLength(6, {message: "Contraseña mínima 6 caracteres"})
    password: string;
}
