import { IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, Min } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateRubroDto {

    @IsOptional({message: "Formato id inválido"})
    @IsString({message: "Formato id inválido"})
    @IsNotEmpty({message: "Id está vacío"})
    _id?: ObjectId

    @IsNotEmpty({message: "El nombre del rubro es obligatorio"})
    @IsString({message: "Nombre del rubro no válido"})
    nombre: string

    @IsNotEmpty({message: "La rentabilidad tiene que ser mayor a 0"})
    @Min(1, {message: "La rentabilidad debe ser mayor a 0"})   
    rentabilidad: number
    
    @IsOptional({message: "Formato creador inválido"})
    @IsString({message: "Formato creador inválido"})
    @IsNotEmpty({message: "Creador está vacío"})
    creador?: ObjectId
}
