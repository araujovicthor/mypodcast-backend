import { ILike, Repository } from 'typeorm';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import Category from '../entities/Category';

import { dataSource } from '@shared/infra/typeorm/dataSource';

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async findById(id: string): Promise<Category | null> {
    const findCategory = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findCategory;
  }

  public async findByTitle(title: string): Promise<Category | null> {
    const findCategory = await this.ormRepository.findOne({
      where: {
        title: ILike(`%${title}%`),
      },
    });

    return findCategory;
  }

  public async create({ title }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      title,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    await this.ormRepository.save(category);

    return category;
  }

  public async delete(category: Category): Promise<void> {
    await this.ormRepository.save({ ...category, deletedAt: new Date() });
  }
}

export default CategoryRepository;
