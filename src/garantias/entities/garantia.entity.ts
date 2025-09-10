import { ObjectId } from "mongodb";
import { Detalles } from "src/helpers/interfaces";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Garantias {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    idProducto: ObjectId

    @Column('int')
    codigo: number

    @Column('array')
    detalles: Detalles[]

    @Column()
    creador: ObjectId

    @CreateDateColumn({ type: 'timestamp' })
    creado: Date
}