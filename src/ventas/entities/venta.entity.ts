import { ObjectId } from "mongodb";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Ventas {

    @ObjectIdColumn()
    _id: ObjectId

    @Column('number')
    codigo: number

    @Column('varchar')
    nombre: string

    @Column('varchar')
    marca: string

    @Column('varchar')
    modelo: string

    @Column('varchar')
    barras: string

    @Column('number')
    dolar: number

    @Column('number')
    precioEnDolar: number

    @Column('number')
    precioEnArs: number

    @Column('int')
    unidades: number

    @Column('varchar')
    fecha: string

    @Column('varchar')
    descripcion: string

    @Column()
    idProducto: ObjectId

    @Column({ type: 'boolean', default: true })
    existeProducto: boolean

    @CreateDateColumn({ type: 'timestamp' })
    creado: Date

    @Column()
    creador?: ObjectId

    @Column('int')
    __v: number

    @BeforeInsert()
    @BeforeUpdate()
    uppercaseFields() {
        this.nombre = this.nombre.toUpperCase();
        this.marca = this.marca.toUpperCase();
        this.modelo = this.modelo.toUpperCase()
        this.descripcion = this.descripcion.toUpperCase()
    }
}
