import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 7, scale: 2 })
  price: number;

  @Column()
  category: string;

  @CreateDateColumn()
  dt_create: string;

  @UpdateDateColumn()
  dt_update: string;
}
