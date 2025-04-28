import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaDto } from './create-venta.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateVentaDto extends PartialType(CreateVentaDto) {

    @IsOptional()
    @IsNotEmpty({ message: "No existe el ID de la venta" })
    @IsString({ message: "ID de la venta no válido" })
    _id?: ObjectId

    @IsNotEmpty({ message: "No existe el id del producto" })
    @IsString({ message: "ID del producto no válido" })
    idProducto: string

    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @Min(1, { message: 'La cantidad debe ser mayor a 0' })
    cantidad: number;

    @IsOptional()
    @IsString({ message: "Formato creador inválido" })
    @IsNotEmpty({ message: "Creador está vacío" })
    creador?: ObjectId
}
