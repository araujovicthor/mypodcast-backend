import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Podcast from '../infra/typeorm/entities/Podcast';

import IPodcastRepository from '../repositories/IPodcastRepository';
import IChannelRepository from '@modules/channels/repositories/IChannelRepository';

interface IRequest {
  title: string;
  channelId: string;
  userId: string;
}

@injectable()
class CreatePodcastService {
  constructor(
    @inject('PodcastRepository')
    private podcastRepository: IPodcastRepository,

    @inject('ChannelRepository')
    private channelRepository: IChannelRepository,
  ) {}

  public async execute({
    title,
    channelId,
    userId,
  }: IRequest): Promise<Podcast> {
    const findChannel = await this.channelRepository.findById(channelId);

    if (!findChannel) {
      throw new AppError('Channel not found');
    }

    if (findChannel.ownerId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    const podcast = await this.podcastRepository.create({
      title,
      channelId,
    });

    return podcast;
  }
}

export default CreatePodcastService;
