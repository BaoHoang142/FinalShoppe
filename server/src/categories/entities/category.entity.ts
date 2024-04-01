import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  categoryName: string;

  @Column({
    type: 'longtext',
  })
  image: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
