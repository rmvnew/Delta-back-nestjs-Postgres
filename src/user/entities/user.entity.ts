import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    register:number

    @Column()
    phone:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({nullable:true})
    createAt:string

    @Column({nullable:true})
    updateAt:string

}
