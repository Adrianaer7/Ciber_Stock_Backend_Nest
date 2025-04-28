import { IsEmail, IsString, MinLength } from "class-validator";
import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuarios {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ unique: true, nullable: false })
    @IsEmail()
    email: string


    @Column({ nullable: false })
    @IsString()
    nombre: string


    @Column({ nullable: false })
    @MinLength(6)
    password: string

    @Column()
    token: string

    @Column()
    confirmado: boolean

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date
}
