import { Repository } from 'typeorm';

import IFollowRepository from '@modules/channels/repositories/IFollowRepository';
import ICreateFollowDTO from '@modules/channels/dtos/ICreateFollowDTO';
import Follow from '../entities/Follow';

import { dataSource } from '@shared/infra/typeorm/dataSource';

class FollowRepository implements IFollowRepository {
  private ormRepository: Repository<Follow>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Follow);
  }

  public async listByUserId(userId: string): Promise<Follow[]> {
    const follows = await this.ormRepository.find({
      where: { userId },
    });

    return follows;
  }

  public async findByUserIdAndChannelId(
    userId: string,
    channelId: string,
  ): Promise<Follow | null> {
    const findFollow = await this.ormRepository.findOne({
      where: {
        userId,
        channelId,
      },
    });

    return findFollow;
  }

  public async create({
    userId,
    channelId,
  }: ICreateFollowDTO): Promise<Follow> {
    const follow = this.ormRepository.create({
      userId,
      channelId,
    });

    await this.ormRepository.save(follow);

    return follow;
  }

  public async delete(follow: Follow): Promise<void> {
    await this.ormRepository.remove(follow);
  }
}

export default FollowRepository;
