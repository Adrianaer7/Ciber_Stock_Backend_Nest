import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateGarantiaDto {

    @IsNotEmpty({ message: "La duracion de la garantia es requerida" })
    @IsString({ message: "Tipo de garantia no válida" })
    garantia: string

    @IsNotEmpty({ message: "El proveedor de la garantía es requerida" })
    @IsString({ message: "El proveedor de la garantía no es válido" })
    proveedor: string

    @IsNotEmpty({ message: "El codigo del producto es necesario" })
    @IsInt({ message: "El codigo del producto tiene que ser entero" })
    @Min(1, { message: "El codigo del producto tiene que ser válido" })
    codigo: number
}
