import { v4 as uuid } from 'uuid';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';

import Category from '@modules/categories/infra/typeorm/entities/Category';

class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async list(): Promise<Category[]> {
    return this.categories;
  }

  public async findById(id: string): Promise<Category | null> {
    const findCategory = this.categories.find(category => category.id === id);

    return findCategory ? findCategory : null;
  }

  public async findByTitle(title: string): Promise<Category | null> {
    const findCategory = this.categories.find(category =>
      category.title.toLowerCase().startsWith(title.toLowerCase()),
    );

    return findCategory ? findCategory : null;
  }

  public async create({ title }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), title });

    this.categories.push(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategory => category.id === findCategory.id,
    );
    this.categories[findIndex] = category;

    return category;
  }

  public async delete(category: Category): Promise<void> {
    const findIndex = this.categories.findIndex(
      findCategory => category.id === findCategory.id,
    );
    this.categories[findIndex] = { ...category, deletedAt: new Date() };
  }
}

export default FakeCategoryRepository;
