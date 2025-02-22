import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
import { Historial } from "src/helpers/interfaces";

@Entity()
export class Compras {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    idProducto: ObjectId

    @Column('varchar')
    nombre: string

    @Column('varchar')
    marca: string

    @Column('varchar')
    modelo: string

    @Column('int')
    codigo: number

    @Column('array')
    historial: Historial[]

    @Column('varchar')
    descripcion: string

    @Column()
    creador?: ObjectId

    @CreateDateColumn({ type: 'timestamp' })
    creado: Date

    @Column('int')
    __v?: number
}
