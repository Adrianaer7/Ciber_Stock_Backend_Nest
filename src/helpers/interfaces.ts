export interface Detalles {
    caducidad: string;
    proveedor: string;
}

export interface JwtPayload {
    id: string;
    iat?: number;
    exp?: number;
}

export interface Historial {
    cantidad: string;
    fecha_compra: string;
    precio_compra_dolar: number;
    precio_compra_peso: number;
    valor_dolar_compra: number;
    proveedor: string;
    barras: string;
    factura: string;
    garantia: string;
    arsAdolar: number;
}

export interface DolarAmbito {
    compra: string;
    venta: string;
    fecha: string;
    variacion: string;
    "class-variacion": string;
    valor_cierre_ant: string;
}

//por la version 6 de la libreria de mongodb tengo que pasar si o si un string en el new ObjectId(). Antes no era necesario especificar el tipo de dato que le pasabas
export interface Usuario {
    _id: string;
    email: string;
    token: string;
    nombre?: string;
}

//le agrego el usuario al request por que el Request es solo de lectura
//a parte, recibo el token en request.headers.authorization
export interface RequestConUsuario extends Request {
    usuario: Usuario;
}