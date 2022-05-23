import { v4 as uuid } from 'uuid';

import IFollowRepository from '@modules/channels/repositories/IFollowRepository';
import ICreateFollowDTO from '@modules/channels/dtos/ICreateFollowDTO';

import Follow from '@modules/channels/infra/typeorm/entities/Follow';

class FakeFollowRepository implements IFollowRepository {
  private follows: Follow[] = [];

  public async listByUserId(userId: string): Promise<Follow[]> {
    return this.follows.filter(follow => follow.userId === userId);
  }

  public async findByUserIdAndChannelId(
    userId: string,
    channelId: string,
  ): Promise<Follow | null> {
    const findFollow = this.follows.find(
      follow => follow.userId === userId && follow.channelId === channelId,
    );

    return findFollow ? findFollow : null;
  }

  public async create({
    userId,
    channelId,
  }: ICreateFollowDTO): Promise<Follow> {
    const follow = new Follow();

    Object.assign(follow, {
      id: uuid(),
      userId,
      channelId,
    });

    this.follows.push(follow);

    return follow;
  }

  public async delete(follow: Follow): Promise<void> {
    const findItems = this.follows.filter(
      findFollow => follow.id !== findFollow.id,
    );

    this.follows = findItems;
  }
}

export default FakeFollowRepository;
