import { CreateProductoDto } from './create-producto.dto';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductoDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateProductoDto)
    producto?: CreateProductoDto

    @IsOptional()
    @IsNumber({}, { message: "Precio no válido" })
    precio?: number;
}
