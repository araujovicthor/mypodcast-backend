import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IChannelRepository from '../repositories/IChannelRepository';
import IFollowRepository from '../repositories/IFollowRepository';

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

  public async execute({ userId, channelId }: IRequest): Promise<void> {
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
      return;
    }

    await this.followRepository.create({ userId, channelId });
    return;
  }
}

export default FollowChannelService;
