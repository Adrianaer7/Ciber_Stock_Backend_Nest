import { IsEmail } from "class-validator";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Proveedores {
    @ObjectIdColumn()
    _id: ObjectId

    @Column('varchar')
    nombre: string

    @Column({ type: 'varchar', nullable: false })
    empresa: string

    @Column('varchar')
    telPersonal: string

    @Column('varchar')
    telEmpresa: string

    @Column()
    @IsEmail()
    email: string

    @Column('varchar')
    datos: string

    @Column()
    creador: ObjectId;

    @Column('int')
    __v: number
}
