import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IChannelRepository from '../repositories/IChannelRepository';
import IFollowRepository from '../repositories/IFollowRepository';
import Channel from '../infra/typeorm/entities/Channel';

interface IRequest {
  userId: string;
  channelId: string;
}

@injectable()
class FollowChannelService {
  constructor(
    @inject('ChannelRepository')
    private channelRepository: IChannelRepository,

    @inject('FollowRepository')
    private followRepository: IFollowRepository,
  ) {}

  public async execute({ userId, channelId }: IRequest): Promise<Channel> {
    const findChannel = await this.channelRepository.findById(channelId);

    if (!findChannel) {
      throw new AppError('Channel does not exists', 404);
    }

    const findFollow = await this.followRepository.findByUserIdAndChannelId(
      userId,
      channelId,
    );

    if (findFollow) {
      await this.followRepository.delete(findFollow);

      findChannel.userFollow = false;
      return findChannel;
    }

    await this.followRepository.create({ userId, channelId });

    findChannel.userFollow = true;
    return findChannel;
  }
}

export default FollowChannelService;
