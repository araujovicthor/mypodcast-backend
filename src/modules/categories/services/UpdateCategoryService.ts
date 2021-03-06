import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Category from '../infra/typeorm/entities/Category';

import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  id: string;
  title: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ id, title }: IRequest): Promise<Category> {
    const findCategory = await this.categoryRepository.findById(id);

    if (!findCategory) {
      throw new AppError('Category does not exists', 404);
    }

    if (title !== findCategory.title) {
      const findCategoryWithSameTitle =
        await this.categoryRepository.findByTitle(title);

      if (findCategoryWithSameTitle) {
        throw new AppError('Already exists categories with this title');
      }
    }

    const updateCategory = await this.categoryRepository.save({
      ...findCategory,
      title,
    });

    return updateCategory;
  }
}

export default UpdateCategoryService;
