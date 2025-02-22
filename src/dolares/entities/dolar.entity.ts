import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Dolares {

    @ObjectIdColumn()
    _id: ObjectId

    @Column('number')
    precio: number

    @Column('boolean')
    automatico: boolean

    @Column()
    creador: ObjectId

}
