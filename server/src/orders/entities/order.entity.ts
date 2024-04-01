import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Store } from 'src/stores/entities/store.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  addressOrder: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  nameOrder: string;

  @Column({
    type: 'tinyint',
    default: true,
  })
  statusOrder: number;
  @Column({
    type:"timestamp",default:() => "CURRENT_TIMESTAMP"
  })
  creatAt:Date

  @Column(
    {
        type:'int',
    }
    )
    totalPrice:number;

    @Column(
        {
            type:'varchar',
            length:100
        }
    )
    phoneOrder:string;


    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Store, (store) => store.orders)
    @JoinColumn({ name: 'storeId' })
    store: Store;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetails: OrderDetail[];
    
}
