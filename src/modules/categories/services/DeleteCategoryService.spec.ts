import AppError from '@shared/errors/AppError';

import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

import DeleteCategoryService from './DeleteCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let deleteCategoryService: DeleteCategoryService;

describe('DeleteCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();

    deleteCategoryService = new DeleteCategoryService(fakeCategoryRepository);
  });

  it('should be able to delete a category', async () => {
    const category = await fakeCategoryRepository.create({
      title: 'Finanças',
    });

    await deleteCategoryService.execute(category);

    const findCategory = await fakeCategoryRepository.findById(category.id);

    await expect(findCategory).toHaveProperty('deletedAt');
  });

  it('should not be able to delete a non-existent category', async () => {
    await expect(
      deleteCategoryService.execute({
        id: 'non-existent-category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
