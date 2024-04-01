
import { Cart } from 'src/carts/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Store } from 'src/stores/entities/store.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
enum Role {
  USER,
  ADMIN,
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    type: 'longtext',
    nullable: true,

  })
  avatarUrl: string;

  @Column({
    type: 'longtext',
    nullable: true,

  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,

  })
  gender: string;

  @Column({
    type: 'date',
    nullable: true,

  })
  birthDay: Date;

  @Column({
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable:true
  })
  phone: string;

  @Column({
    type: 'tinyint',
    default: true,
  })
  statusUser: number;

  @Column({
    type: 'tinyint',
    default: Role.USER,
  })
  role: Role;

  @OneToOne(() => Store, (store) => store.user)
  store: Store;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(()=> Review, (review)=>review.user)
  review:Review
}
