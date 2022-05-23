import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Channel from '../infra/typeorm/entities/Channel';

import IChannelRepository from '../repositories/IChannelRepository';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';

interface IRequest {
  ownerId: string;
  name: string;
  description: string;
  categoriesIds: string[];
}

@injectable()
class CreateChannelService {
  constructor(
    @inject('ChannelRepository')
    private channelRepository: IChannelRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    ownerId,
    name,
    description,
    categoriesIds,
  }: IRequest): Promise<Channel> {
    if (!categoriesIds.length) {
      throw new AppError('Channel must have at least one category');
    }

    const allCategories = await this.categoryRepository.list();

    const categories = allCategories.filter(category =>
      categoriesIds.some(id => id === category.id),
    );

    if (!categories.length) {
      throw new AppError('There is no valid ids on categories');
    }

    const serializedCategories = categories.map(category => ({
      categoryId: category.id,
    }));

    const channel = await this.channelRepository.create({
      name,
      description,
      ownerId,
      categories: serializedCategories,
    });

    return channel;
  }
}

export default CreateChannelService;
