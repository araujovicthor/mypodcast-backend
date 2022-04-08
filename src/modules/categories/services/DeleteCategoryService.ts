import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const findCategory = await this.categoryRepository.findById(id);

    if (!findCategory) {
      throw new AppError('Category does not exists', 404);
    }

    await this.categoryRepository.delete(findCategory);
  }
}

export default DeleteCategoryService;
