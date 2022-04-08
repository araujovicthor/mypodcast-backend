import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import { container } from 'tsyringe';

import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class CategoriesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();

    return response.json(instanceToInstance(categories));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      title,
    });

    return response.json(instanceToInstance(category));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title } = request.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    const category = await updateCategory.execute({ id, title });

    return response.json(instanceToInstance(category));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute({ id });

    return response.json();
  }
}
