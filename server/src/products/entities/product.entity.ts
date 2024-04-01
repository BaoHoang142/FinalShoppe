import { Cart } from 'src/carts/entities/cart.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Store } from 'src/stores/entities/store.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  productName: string;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
    default: 0,
  })
  quantitySole: number;

  @Column({
    type: 'tinyint',
    default: true,
  })
  statusProduct: number;

  @Column({
    type: 'longtext',
  })
  imageProduct: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @ManyToMany(() => Store, (store) => store.products)
  @JoinTable()
  stores: Store[];
}
