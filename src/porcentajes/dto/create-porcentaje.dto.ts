import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreatePorcentajeDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    nombre: string;

    @IsNotEmpty({ message: 'La comision es requerida' })
    @IsNumber({}, { message: 'La comision debe ser un numero' })
    @Min(0, { message: 'La comision debe ser mayor a 0' })
    comision: number;

    @IsNotEmpty({ message: 'El tipo es requerido' })
    @IsString({ message: 'El tipo debe ser un texto' })
    tipo: string;

}
