import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Connection, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Interface } from 'readline';
import { Category } from 'src/categories/entities/category.entity';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';
import { Store } from 'src/stores/entities/store.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private ProductRepos: Repository<Product>,
    @InjectRepository(Category) private CateRepos: Repository<Category>,
    @InjectRepository(Store) private StoreRepos: Repository<Store>,
    private readonly connection: Connection,
  ) {}
  async create(Body: any) {
    const {
      productName,
      price,
      imageProduct,
      description,
      quantity,
      categoryId,
      storeId,
    } = Body;
    const store = await this.StoreRepos.findOne({
      where: { storeId: storeId },
    }); // Lấy đối tượng Store từ cơ sở dữ liệu
    const product = this.ProductRepos.create({
      productName: productName,
      price: price,
      imageProduct: imageProduct,
      description: description,
      quantity: quantity,
      category: categoryId,
    });

    product.stores = [store]; // Gán đối tượng Store cho thuộc tính stores của Product

    return await this.ProductRepos.save(product);
  }

  async findAll() {
    const product = await this.ProductRepos.find();
    // const result = await this.ProductRepos.createQueryBuilder('product')
    // .orderBy('product.productId', 'DESC')
    return product;
  }

  async findAllProductAdmin() {
    const product = await this.ProductRepos.find({
      relations: ['category', 'stores'],
    });
    return product;
  }

  async findProductByCategoryService(id: number) {
    const productByCategory = await this.ProductRepos.createQueryBuilder(
      'product',
    )
      .where('product.categoryId = :id', { id })
      .getMany();
    return productByCategory;
  }

  async findOneById(id: number) {
    const product = await this.ProductRepos.findOne({
      relations: ['category', 'stores', 'images', 'reviews', 'stores.user'],
      where: { productId: id.toString() },
    });
    const reviews = await this.ProductRepos.createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('product.stores', 'store')
      .where('product.productId = :productId', { productId: id })
      .getMany();
    return {
      data: product,
      review: reviews,
    };
  }

  async findByStoreId(storeId: number) {
    const productByStore = await this.ProductRepos.createQueryBuilder('product')
      .leftJoinAndSelect('product.stores', 'store')
      .where('store.storeId = :storeId', { storeId })
      .getMany();
    return productByStore;
  }

  async findByQuantity() {
    const productByQuantity = await this.ProductRepos.find({
      where: {
        quantitySole: MoreThan(30),
      },
    });
    return productByQuantity;
  }

  async getProductReviews(productId: number) {
    const reviews = await this.ProductRepos.createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .where('product.productId = :productId', { productId })
      .getMany();

    return reviews;
  }
  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async getProductsByStoreId(id: any): Promise<Product[]> {
    const store = await this.StoreRepos.findOne({ where: { storeId: id } });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    console.log(store);
    const products = await this.ProductRepos.find({ where: { stores: store } });
    return products;
  }

  async searchProduct(key: any) {
    const products = await this.ProductRepos.createQueryBuilder('product')
      .innerJoinAndSelect('product.stores', 'stores')
      .where('product.productName LIKE :key', { key: `%${key}%` })
      .getMany();

    return products;
  }

  async update(id: any, updateProductDto: UpdateProductDto) {
    const {
      productName,
      price,
      description,
      quantity,
      categoryId,
      imageProduct,
    } = updateProductDto;
    try {
      return this.connection.transaction(async (entityManager) => {
        await entityManager
          .createQueryBuilder()
          .update(Product)
          .set({
            productName: productName,
            price: price,
            description: description,
            quantity: quantity,
            category: categoryId,
            imageProduct: imageProduct,
          })
          .where('productId = :productId', { productId: id })
          .execute();
        const product = await entityManager.findOneOrFail(Product, {
          where: {
            productId: id,
          },
        });
        return {
          message: 'Đã cập nhật',
          data: product,
        };
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error updating product:', error);
    }
  }

  async updateStatus(id: any, updateProductDto: UpdateProductDto) {
    const { statusProduct } = updateProductDto;
    const product = await this.ProductRepos.findOneOrFail({
      where: { productId: id },
    });
    product.statusProduct = statusProduct;

    await this.ProductRepos.save(product);

    return product;
  }

  async updateAdminStatusProduct(updateProductDto: UpdateProductDto) {
    const { statusProduct, productId, storeId } = updateProductDto;
    const product = await this.ProductRepos.update(
      { productId: productId },
      { statusProduct: statusProduct },
    );
  }

  async updateQuantity(id: any, updateProductDto: UpdateProductDto) {
    const { quantity } = updateProductDto;
    const product = await this.ProductRepos.findOneOrFail({
      where: { productId: id },
    });
    product.quantity = quantity;
    await this.ProductRepos.save(product);
    return product;
  }

  async updateQuantitySole(id: any, updateProductDto: UpdateProductDto) {
    const { quantitySole } = updateProductDto;
    const product = await this.ProductRepos.findOneOrFail({
      where: { productId: id },
    });
    product.quantitySole = quantitySole;
    await this.ProductRepos.save(product);
    return product;
  }
  async remove(id: number) {
    console.log(id);
    return await this.ProductRepos.createQueryBuilder('product')
      .delete()
      .from(Product)
      .where('productId = :productId', { productId: id })
      .execute();
  }
}
