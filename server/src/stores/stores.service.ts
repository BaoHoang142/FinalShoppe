import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(Store) private StoreRepos: Repository<Store>) {}
  create(createStoreDto: CreateStoreDto) {
    const {phone,addressStore,storeName,emailStore,storeId} = createStoreDto
    const store = this.StoreRepos.create({
      storeId,
      storeName,
      addressStore,
      phone,
      emailStore,
      user:{userId:storeId}
    })
    return this.StoreRepos.save(store)
  }

  async findAll() {
    const stores = this.StoreRepos.find();
    return stores;
  }

  async findOne(id: number) {
    console.log(id)
      const storeUser = await this.StoreRepos.findOne({
      relations: ['user'],
      where: { storeId: id.toString() },
    });
    return storeUser;
  }

  async searchStore(key: any) {
    console.log(key)
    const store = await this.StoreRepos.createQueryBuilder('store')
    .where('store.storeName LIKE :key', {key: `%${key}%`})
    .getMany()
    return store
  }

  

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  async updateStatusAdmin(id: number, updateStoreDto: UpdateStoreDto) {
   const {statusStore} = updateStoreDto
   const store = await this.StoreRepos.update(id, {statusStore})
   return store
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
