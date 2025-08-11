import { ObjectId } from "mongodb";
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Porcentajes {

    @ObjectIdColumn()
    _id: ObjectId

    @Column('varchar')
    nombre: string;

    @Column('numeric')
    comision: number;

    @Column('varchar')
    tipo: string

    @Column()
    creador: ObjectId

    @BeforeInsert()
    @BeforeUpdate()
    uppercaseFields() {
        this.nombre = this.nombre.toUpperCase();
        this.tipo = this.tipo.toUpperCase();
    }
}
