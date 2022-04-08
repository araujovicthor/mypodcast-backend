import AppError from '@shared/errors/AppError';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

import CreateCategoryService from './CreateCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let createCategoryService: CreateCategoryService;

describe('CreateCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();

    createCategoryService = new CreateCategoryService(fakeCategoryRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryService.execute({
      title: 'Finanças',
    });

    await expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with same name', async () => {
    fakeCategoryRepository.create({
      title: 'Finanças',
    });

    await expect(
      createCategoryService.execute({
        title: 'Finanças',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
