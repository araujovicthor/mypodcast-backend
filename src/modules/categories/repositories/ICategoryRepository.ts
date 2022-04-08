import Category from '../infra/typeorm/entities/Category';

import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

export default interface ICategoryRepository {
  list(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findByTitle(title: string): Promise<Category | null>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
  delete(category: Category): Promise<void>;
}
