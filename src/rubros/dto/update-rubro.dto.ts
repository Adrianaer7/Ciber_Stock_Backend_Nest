import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateRubroDto {

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre no es válido' })
    nombre: string;

    @IsNotEmpty({ message: 'La rentabilidad es obligatoria' })
    @IsNumber({}, { message: 'La rentabilidad debe ser un número' })
    @Min(1, { message: 'La rentabilidad debe ser mayor a 0' })
    rentabilidad: number;
}
