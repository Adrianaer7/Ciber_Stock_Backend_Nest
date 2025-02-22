import { IsBoolean, IsInt, IsNotEmpty, IsNumberString, IsString, Min, ValidateNested } from "class-validator";
import { CreateProductoDto } from "src/productos/dto/create-producto.dto";
import { Type } from 'class-transformer';


export class CreateCompraDto {
    @IsString({message: "Cantidad no válida"})
    cantidad: string; 

    @IsBoolean({message: "Origen no válido"}) 
    desdeForm: boolean;
    
    @ValidateNested() 
    @Type(() => CreateProductoDto) 
    producto: CreateProductoDto
}


