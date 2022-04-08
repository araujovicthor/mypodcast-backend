import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Category from '../infra/typeorm/entities/Category';

import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  title: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ title }: IRequest): Promise<Category> {
    const findCategory = await this.categoryRepository.findByTitle(title);

    if (findCategory) {
      throw new AppError('Category already exists');
    }

    const category = await this.categoryRepository.create({
      title,
    });

    return category;
  }
}

export default CreateCategoryService;
