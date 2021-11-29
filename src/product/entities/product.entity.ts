import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string
    
    @Column()
    quantity: number

    @Column("decimal",{precision:5,scale:2})
    price: number

    @Column()
    category: string
}
