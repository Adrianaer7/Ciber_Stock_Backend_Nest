import { PartialType } from '@nestjs/mapped-types';
import { CreateRubroDto } from './create-rubro.dto';
import { IsMongoId, IsNotEmpty, IsString, Min } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateRubroDto extends PartialType(CreateRubroDto) {

    @IsNotEmpty({ message: 'El ID es obligatorio para actualizar' })
    @IsString({ message: 'Formato de ID inválido' })
    @IsMongoId({ message: 'Formato de ID inválido' })
    _id: ObjectId;

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre no es válido' })
    nombre: string;

    @IsNotEmpty({ message: 'La rentabilidad es obligatoria' })
    @Min(1, { message: 'La rentabilidad debe ser mayor a 0' })
    rentabilidad: number;
}
