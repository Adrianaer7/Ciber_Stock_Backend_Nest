import { IsInt, Min } from 'class-validator';

export class UpdateVentaDto {
    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @Min(0, { message: 'La cantidad debe ser mayor o igual a 0' })
    cantidad: number;
}
