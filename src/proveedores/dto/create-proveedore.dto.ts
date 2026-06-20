import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProveedorDto {

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
    @IsString({ message: "Email no válido" })
    email?: string
}
