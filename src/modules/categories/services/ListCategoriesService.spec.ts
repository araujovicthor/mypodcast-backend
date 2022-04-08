import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import ListCategoriesService from './ListCategoriesService';

let fakeCategoryRepository: FakeCategoryRepository;
let listCategoriesService: ListCategoriesService;

describe('ListCategoriesService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    listCategoriesService = new ListCategoriesService(fakeCategoryRepository);
  });

  it('should be able to list all categories', async () => {
    await fakeCategoryRepository.create({
      title: 'Finanças',
    });

    await fakeCategoryRepository.create({
      title: 'Educação',
    });

    const categories = await listCategoriesService.execute();

    await expect(categories.length).toBe(2);
  });

  it('should be return a empty array if there is no categories', async () => {
    const categories = await listCategoriesService.execute();

    await expect(categories.length).toBe(0);
  });
});
