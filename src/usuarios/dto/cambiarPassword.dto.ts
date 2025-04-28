import { IsEmail } from "class-validator";

export class ChangePasswordDto {
    @IsEmail({}, { message: "El email tiene que ser válido" })
    email: string;
}
