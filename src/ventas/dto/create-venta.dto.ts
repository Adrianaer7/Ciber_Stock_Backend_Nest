import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateVentaDto {

    @IsNotEmpty({ message: "No existe el id del producto" })
    @IsString({ message: "ID del producto no válido" })
    idProducto: string

    @IsNotEmpty({ message: "No existe el código del producto" })
    @IsInt({ message: "Código del producto no válido" })
    @Min(1, { message: "Código del producto no válido" })
    codigo: number

    @IsNotEmpty({ message: "No existe el nombre del producto" })
    @IsString({ message: "Nombre del producto no válido" })
    nombre: string

    @IsString({ message: "Marca del producto no válida" })
    marca: string

    @IsString({ message: "Modelo del producto no válido" })
    modelo: string

    @IsString({ message: "Código de barras del producto no válido" })
    barras: string

    @IsNotEmpty({ message: "No existe la descripción del producto" })
    @IsString({ message: "Descripción del producto no válida" })
    descripcion: string

    @IsNumber({}, { message: "Cotizacion del dólar del producto no válida" })
    @Min(1, { message: "Cotizacion del dólar del producto no válida" })
    dolar: number

    @IsString({ message: "Precio en dólar del producto no válido" })
    precioEnDolar: string

    @IsBoolean({ message: "Propiedad existe producto inválida" })
    existeProducto: boolean;

    @IsNumber({}, { message: "Precio en pesos del producto no válido" })
    @Min(0, { message: "Precio en pesos del producto no válido" })
    precioEnArs: number

    @IsInt({ message: "Unidades del producto no válido" })
    @Min(1, { message: "Unidades del producto no válido" })
    unidades: number

    @IsNotEmpty({ message: "Fecha de la venta no válida" })
    @IsString({ message: "Fecha de la venta no válida" })
    fecha: string
}
