import { PartialType } from '@nestjs/mapped-types';
import { CreateCompraDto } from './create-compra.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCompraDto extends PartialType(CreateCompraDto) {
    @IsOptional()
    @IsBoolean({ message: "Formato de desdeForm inválido" })
    desdeForm?: boolean;
}
