import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Channel from '../infra/typeorm/entities/Channel';

import IChannelRepository from '../repositories/IChannelRepository';
import IFollowRepository from '../repositories/IFollowRepository';

interface IRequest {
  userId: string;
  id: string;
}

@injectable()
class ShowChannelService {
  constructor(
    @inject('ChannelRepository')
    private channelRepository: IChannelRepository,

    @inject('FollowRepository')
    private followRepository: IFollowRepository,
  ) {}

  public async execute({ userId, id }: IRequest): Promise<Channel> {
    const channel = await this.channelRepository.findById(id);

    if (!channel) {
      throw new AppError('Channel does not exists', 404);
    }

    const findFollow = await this.followRepository.findByUserIdAndChannelId(
      userId,
      id,
    );

    channel.userFollow = findFollow ? true : false;

    return channel;
  }
}

export default ShowChannelService;
