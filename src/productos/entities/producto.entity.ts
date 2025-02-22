import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Productos {

    @ObjectIdColumn()
    _id: ObjectId

    @Column({type: "varchar", nullable: false})
    nombre: string

    @Column('varchar')
    marca: string

    @Column('varchar')
    modelo: string

    @Column({type: 'int', nullable: false, unique: true})
    codigo: number

    @Column('varchar')
    barras: string

    @Column('varchar')
    rubro: string

    @Column('number')
    rubroValor: number

    @Column('number')
    precio_venta: number

    @Column('number')
    precio_venta_conocidos: number

    @Column('number')
    precio_venta_efectivo: number

    @Column('number')
    precio_venta_tarjeta: number

    @Column('number')
    precio_venta_ahoraDoce: number

    @Column('number')
    precio_venta_cuotas: number

    @Column('number')
    precio_compra_dolar: number

    @Column('number')
    precio_compra_peso: number

    @Column('number')
    valor_dolar_compra: number

    @Column('varchar')
    proveedor: string

    @Column('array')
    todos_proveedores: string[]

    @Column('varchar')
    factura: string

    @Column('varchar')
    garantia: string

    @Column('varchar')
    fecha_compra: string

    @Column('int')
    disponibles: number

    @Column('int')
    cantidad: number

    @Column('varchar')
    imagen: string

    @Column('varchar')
    notas: string

    @Column('boolean')
    faltante: boolean

    @Column('number')
    limiteFaltante: number

    @Column('boolean')
    añadirFaltante: boolean

    @Column('boolean')
    visibilidad: boolean

    @CreateDateColumn({ type: 'timestamp' })
    creado: Date

    @Column()
    creador: ObjectId

    @Column('string')
    descripcion: string

    @Column('int')
    __v: number
}
