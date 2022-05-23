import Follow from '../infra/typeorm/entities/Follow';

import ICreateFollowDTO from '../dtos/ICreateFollowDTO';

export default interface IFollowRepository {
  listByUserId(userId: string): Promise<Follow[]>;
  findByUserIdAndChannelId(
    userId: string,
    channelId: string,
  ): Promise<Follow | null>;
  create(data: ICreateFollowDTO): Promise<Follow>;
  delete(follow: Follow): Promise<void>;
}
