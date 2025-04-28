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
    valor_dolar_compra: number;
    proveedor: string;
    barras: string;
    factura: string;
    garantia: string;
}

export interface DolarAmbito {
    compra: string;
    venta: string;
    fecha: string;
    variacion: string;
    "class-variacion": string;
    valor_cierre_ant: string;
}
