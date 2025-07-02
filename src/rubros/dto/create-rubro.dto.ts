import { IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateRubroDto {

    @IsOptional()
    @IsString({ message: 'Formato de ID inválido' })
    _id?: ObjectId;

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre no es válido' })
    nombre: string;

    @IsNotEmpty({ message: 'La rentabilidad es obligatoria' })
    @Min(1, { message: 'La rentabilidad debe ser mayor a 0' })
    rentabilidad: number;

    @IsOptional({ message: "Formato creador inválido" })
    @IsString({ message: "Formato creador inválido" })
    @IsNotEmpty({ message: "Creador está vacío" })
    creador?: ObjectId
}
