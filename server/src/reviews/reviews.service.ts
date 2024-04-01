import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private ReviewRepos: Repository<Review>,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    const { content, rate, productId, userId } = createReviewDto;
    const review:DeepPartial<Review> = {
      content: content,
      rate: rate,
      product: { productId: productId.toString() },
      user: { userId: userId.toString() },
    }
    const newReview = await this.ReviewRepos.create(review);
    return await this.ReviewRepos.save(newReview);
  }

  async findAll() {
    const reviews = await this.ReviewRepos.find();
    return reviews;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
