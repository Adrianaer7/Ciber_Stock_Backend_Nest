import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateProveedorDto {

    @IsOptional({ message: "Formato id inválido" })
    @IsString({ message: "Formato id inválido" })
    @IsNotEmpty({ message: "Id está vacío" })
    _id?: ObjectId

    @IsString({ message: "Nombre del proveedor no válido" })
    nombre: string

    @IsNotEmpty({ message: "El nombre de la empresa es obligatorio" })
    @IsString({ message: "Empresa del proveedor no válida" })
    empresa: string

    @IsString({ message: "Teléfono del proveedor no válida" })
    telPersonal: string

    @IsString({ message: "Teléfono de la empresa no válida" })
    telEmpresa: string

    @IsOptional()
    email?: string;

    @IsOptional({ message: "Formato datos inválido" })
    @IsString({ message: "Formato datos inválido" })
    @IsNotEmpty({ message: "Datos está vacío" })
    datos?: string

    @IsOptional({ message: "Formato creador inválido" })
    @IsString({ message: "Formato creador inválido" })
    @IsNotEmpty({ message: "Creador está vacío" })
    creador?: ObjectId

    @IsOptional({ message: "Formato creador inválido" })
    @IsInt({ message: "Formato creador inválido" })
    @IsNotEmpty({ message: "Creador está vacío" })
    __v?: number
}
