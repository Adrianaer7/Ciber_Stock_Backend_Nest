import {  IsInt, IsNotEmpty, Min, ValidateNested } from "class-validator";
import { CreateProductoDto } from "src/productos/dto/create-producto.dto";
import { Type } from 'class-transformer';


export class CreateCompraDto {
    @IsNotEmpty({ message: "La cantidad de unidades es obligatoria" })
    @IsInt({ message: "La cantidad tiene que ser numérico" })
    @Min(1, { message: "La cantidad tiene que ser mayor que 0" })
    cantidad: number;

    //valido todos los campos del producto usando el dto de producto
    @ValidateNested()
    @Type(() => CreateProductoDto)
    producto: CreateProductoDto
}


