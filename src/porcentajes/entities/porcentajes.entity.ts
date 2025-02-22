import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

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
}
