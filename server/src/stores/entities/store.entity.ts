import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  storeId: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  storeName: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  addressStore: string;

  @Column({
    type: 'tinyint',
    default: true,
  })
  statusStore: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  emailStore: string;


  @OneToOne(() => User, (user) => user.store)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];

  @ManyToMany(() => Product, (product) => product.stores, {
    cascade: true,
  })
  products: Product[];
}
