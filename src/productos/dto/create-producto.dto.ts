import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateProductoDto {

    @IsOptional({ message: "Formato id inválido" })
    @IsString({ message: "Formato id inválido" })
    @IsNotEmpty({ message: "Id está vacío" })
    _id?: ObjectId

    @IsNotEmpty({ message: "El nombre del producto es obligatorio" })
    @IsString({ message: "Nombre no válido" })
    nombre: string

    @IsString({ message: "Marca no válida" })
    marca: string

    @IsString({ message: "Modelo no válido" })
    modelo: string

    @IsNotEmpty({ message: "El código del producto es obligatorio" })
    @IsInt({ message: "Código tiene que ser numérico" })
    @Min(1, { message: "Código no válido" })
    codigo: number

    @IsString({ message: "Código de barras no válido" })
    barras: string

    @IsString({ message: "Rubro no válido" })
    rubro: string

    @IsNumber({}, { message: "Valor del rubro tiene que ser numérico" })
    @Min(0, { message: "Valor del rubro no válido" })
    rubroValor: number

    @IsNumber({}, { message: "Precio de venta tiene que ser numérico" })
    @Min(0, { message: "Precio de venta no válido" })
    precio_venta: number

    @IsNumber({}, { message: "Precio de venta para conocidos tiene que ser numérico" })
    @Min(0, { message: "Precio de venta para conocidos no válido" })
    precio_venta_conocidos: number

    @IsNumber({}, { message: "Precio de venta efectivo tiene que ser numérico" })
    @Min(0, { message: "Precio de venta en efectivo no válido" })
    precio_venta_efectivo: number

    @IsNumber({}, { message: "Precio de venta tarjeta tiene que ser numérico" })
    @Min(0, { message: "Precio de venta tarjeta no válido" })
    precio_venta_tarjeta: number

    @IsNumber({}, { message: "Precio de venta ahora doce tiene que ser numérico" })
    @Min(0, { message: "Precio de venta ahora doce no válido" })
    precio_venta_ahoraDoce: number

    @IsNumber({}, { message: "Precio de venta en cuotas tiene que ser numérico" })
    @Min(0, { message: "Precio de venta en cuotas no válido" })
    precio_venta_cuotas: number

    @IsNumber({}, { message: "Precio de compra en dolar tiene que ser numérico" })
    @Min(0, { message: "Precio de compra en dolar no válido" })
    precio_compra_dolar: number

    @IsNumber({}, { message: "Precio de compra en pesos tiene que ser numérico" })
    @Min(0, { message: "Precio de compra en pesos no válido" })
    precio_compra_peso: number

    @IsNumber({}, { message: "Valor dolar compra tiene que ser numérico" })
    @Min(0, { message: "Valor dolar compra no válido" })
    valor_dolar_compra: number

    @IsString({ message: "Id proveedor inválido" })
    proveedor: string

    @IsArray({ message: "Proveedores inválidos" })
    @IsString({ each: true, message: "Cada proveedor debe ser un string" })
    todos_proveedores: string[]

    @IsString({ message: "N° factura inválido" })
    factura: string

    @IsString({ message: "Garantía inválida" })
    garantia: string

    @IsString({ message: "Formato de fecha inválido" })
    fecha_compra: string

    @IsString({ message: "Imagen no válida" })
    imagen: string

    @IsString({ message: "Nota no válida" })
    notas: string

    @IsBoolean({ message: "Campo faltante no válido" })
    faltante: boolean

    @IsInt({ message: "N° de faltantes inválido" })
    limiteFaltante: number

    @IsBoolean({ message: "Campo añadir faltante inválido" })
    añadirFaltante: boolean

    @IsBoolean({ message: "Campo isibilidad inválido" })
    visibilidad: boolean

    @IsInt({ message: "La cantidad de disponibles no es válida" })
    disponibles: number

    @IsOptional({ message: "Formato creador inválido" })
    @IsString({ message: "Formato creador inválido" })
    @IsNotEmpty({ message: "Creador está vacío" })
    creador?: ObjectId

    @IsOptional()
    creado?: Date

    @IsOptional()
    @IsString({ message: "Descripción no válida" })
    descripcion: string
}
