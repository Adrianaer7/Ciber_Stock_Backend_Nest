import { PartialType } from '@nestjs/mapped-types';
import { CreatePorcentajeDto } from './create-porcentaje.dto';
import { ObjectId } from 'mongodb';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePorcentajeDto extends PartialType(CreatePorcentajeDto) {
    @IsString({ message: 'El id debe ser string' })
    _id: ObjectId

    @IsOptional()
    @IsString({ message: 'El id del creador debe ser un string' })
    creador: ObjectId
}
