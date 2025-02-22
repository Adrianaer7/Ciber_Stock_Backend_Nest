import { IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Rubros {

    @ObjectIdColumn()
    _id?: ObjectId

    @Column({unique: true})
    @IsString()
    nombre: string

    @Column()
    @IsNumber()
    rentabilidad: number

    @Column()
    creador: ObjectId
}
