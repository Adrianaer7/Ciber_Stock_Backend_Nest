import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsBoolean, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsOptional()
    @IsBoolean({ message: "Formato de desdeForm inválido" })
    desdeForm?: boolean;

    @IsOptional()
    @IsNumber({}, { message: "Precio no válido" })
    precio?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateProductoDto)
    producto?: CreateProductoDto
}
