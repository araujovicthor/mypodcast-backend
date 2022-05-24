import { ILike, Repository } from 'typeorm';

import IChannelRepository from '@modules/channels/repositories/IChannelRepository';
import ICreateChannelDTO from '@modules/channels/dtos/ICreateChannelDTO';
import Channel from '../entities/Channel';

import { dataSource } from '@shared/infra/typeorm/dataSource';

class ChannelRepository implements IChannelRepository {
  private ormRepository: Repository<Channel>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Channel);
  }

  public async list(categoryId?: string, userId?: string): Promise<Channel[]> {
    const channels = await this.ormRepository.find({
      where: { categoriesChannels: { categoryId }, follow: { userId } },
    });

    return channels;
  }

  public async findById(id: string): Promise<Channel | null> {
    const findChannel = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['podcasts'],
    });

    return findChannel;
  }

  public async findByName(name: string): Promise<Channel | null> {
    const findChannel = await this.ormRepository.findOne({
      where: {
        name: ILike(`%${name}%`),
      },
    });

    return findChannel;
  }

  public async create({
    name,
    description,
    ownerId,
    categories,
  }: ICreateChannelDTO): Promise<Channel> {
    const channel = this.ormRepository.create({
      name,
      description,
      ownerId,
      categoriesChannels: categories,
    });

    await this.ormRepository.save(channel);

    return channel;
  }

  public async save(channel: Channel): Promise<Channel> {
    await this.ormRepository.save(channel);

    return channel;
  }

  public async delete(channel: Channel): Promise<void> {
    await this.ormRepository.save({ ...channel, deletedAt: new Date() });
  }
}

export default ChannelRepository;
