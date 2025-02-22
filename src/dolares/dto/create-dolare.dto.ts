import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator"
import { ObjectId } from "mongodb"

export class CreateDolarDto {

    @IsNotEmpty({message: 'El dolar es requerido'})
    @IsNumber({}, {message: 'El dolar debe ser un numero'})
    @Min(1, {message: 'El dolar debe ser mayor a 0'})
    precio: number

    @IsNotEmpty({message: 'Tipo de dolar es requerido'})
    @IsBoolean({message: 'Tipo de dolar invalido'})
    automatico: boolean
}