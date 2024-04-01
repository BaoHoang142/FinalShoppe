import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private CateRepos: Repository<Category>) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const {categoryName, image} = createCategoryDto;
    const category = this.CateRepos.create({
      categoryName: categoryName,
      image: image
    })
    return await this.CateRepos.save(category);
  }

  async findAll() {
    return await this.CateRepos.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const {categoryName, image} = updateCategoryDto
    try {
      return await this.CateRepos.update({categoryId: id}, {
        categoryName: categoryName,
        image: image
      })
    } catch (error) {
      console.error(error)
    }
  }

  async remove(id: number) {
    const category = await this.CateRepos.delete({categoryId: id});
    return category
  }
}
