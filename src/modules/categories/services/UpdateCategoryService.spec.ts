import AppError from '@shared/errors/AppError';

import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

import UpdateCategoryService from './UpdateCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let updateCategoryService: UpdateCategoryService;

describe('UpdateCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();

    updateCategoryService = new UpdateCategoryService(fakeCategoryRepository);
  });

  it('should be able to update a category', async () => {
    const category = await fakeCategoryRepository.create({
      title: 'Finanças',
    });

    const updateCategory = await updateCategoryService.execute({
      id: category.id,
      title: 'Educação',
    });

    await expect(updateCategory.id).toBe(category.id);
    await expect(updateCategory.title).toBe('Educação');
  });

  it('should not be able to update a non-existent category', async () => {
    await expect(
      updateCategoryService.execute({
        id: 'non-existent-category',
        title: 'Educação',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
