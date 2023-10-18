import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm'
import { IsNotEmpty } from 'class-validator';

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id:number;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    lastname:string;
    
    @Column({unique: true})
    @IsNotEmpty()
    email:string;

    @Column()
    @IsNotEmpty()
    password:string;

    @Column()
    @IsNotEmpty()
    phoneNumber:number;

    @Column("date")
    @IsNotEmpty()
    age:Date;

    //@Column({type: 'enum', default: Role.USER, enum:Role})
    //@IsNotEmpty()
    //role:Role;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    @IsNotEmpty()
    createdAt:Date;

}