import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Product) private ProductRepos: Repository<Product>,
    @InjectRepository(Cart) private CartRepos: Repository<Cart>,
    @InjectRepository(User) private UserRepos: Repository<User>,
  ) {}
  async create(quantityCart: number, userId: number, productId: number) {
    const checkCart = await this.findOne(userId, productId);
    if (checkCart.length == 0) {
      const cart = await this.CartRepos.createQueryBuilder('cart')
        .insert()
        .into(Cart)
        .values({
          quantityCart: quantityCart,
          user: userId as any,
          product: productId as any,
        })
        .execute();
      return {
        message: 'Thêm sản phẩm thành công',
      };
    } else {
      const cart = await this.CartRepos.createQueryBuilder('cart')
        .update(Cart)
        .set({ quantityCart: quantityCart + checkCart[0].cart_quantityCart })
        .where('cartId = :id', { id: checkCart[0].cart_cartId })
        .execute();
      return {
        message: 'Tăng số lượng thành công',
      };
    }
  }

  async findAll(id: any) {
    const cart = await this.CartRepos.createQueryBuilder('cart')
      .innerJoinAndSelect('cart.product', 'product')
      .innerJoinAndSelect('cart.user', 'user')
      .innerJoinAndSelect('product.stores', 'stores')
      .where('user.userId = :id', { id })
      .getMany();
    return cart;
  }

  async findOne(userId: any, productId: any) {
    const cart = await this.CartRepos.createQueryBuilder('cart')
      .where('cart.user.userId = :userId', { userId })
      .andWhere('cart.productId = :productId', { productId })
      .execute();
    return cart;
  }

  async update(id: any, updateCartDto: UpdateCartDto) {
    const { quantityCart } = updateCartDto;
    const cart = await this.CartRepos.findOne({ where: { cartId: id } });
    cart.quantityCart = cart.quantityCart + quantityCart;
    return this.CartRepos.save(cart);
  }

  async remove(id: number) {
    await this.CartRepos.delete({ cartId: id });
    return {
      message: 'Đã xóa',
      status: 200,
    };
  }
}
