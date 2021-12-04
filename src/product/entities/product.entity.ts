import { Column, Entity, PrimaryGeneratedColumn,UpdateDateColumn,CreateDateColumn } from "typeorm"


@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    barcode: string

    @Column()
    description: string
    
    @Column()
    quantity: number

    @Column("decimal",{precision:5,scale:2})
    price: number

    @Column()
    category: string

    // @CreateDateColumn({type:'time with time zone'})
    // @CreateDateColumn({type:'timestamp with time zone'})
    // @CreateDateColumn({type:'timestamptz'})   
    // @Column({
    //     default: () => "NOW()"
    // })
    @Column({nullable:true})
    // @CreateDateColumn()
    dt_create?: string

    // @UpdateDateColumn({type:'timestamp with time zone'})
    // @UpdateDateColumn({type:"time with time zone"})
    // @UpdateDateColumn()
    // @Column({
    //     default: () => "NOW()"
    // })
    @Column({nullable:true})
    // @UpdateDateColumn()
    dt_update?: string
}
