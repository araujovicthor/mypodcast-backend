import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Podcast from '../infra/typeorm/entities/Podcast';

import IPodcastRepository from '../repositories/IPodcastRepository';

interface IRequest {
  userId: string;
  id: string;
  title?: string;
}

@injectable()
class UpdatePodcastService {
  constructor(
    @inject('PodcastRepository')
    private podcastRepository: IPodcastRepository,
  ) {}

  public async execute({ id, title, userId }: IRequest): Promise<Podcast> {
    const findPodcast = await this.podcastRepository.findById(id);

    if (!findPodcast) {
      throw new AppError('Podcast does not exists', 404);
    }

    if (findPodcast.channel.ownerId !== userId) {
      throw new AppError('Only owner can delete a podcast');
    }

    if (title) findPodcast.title = title;

    const updatePodcast = await this.podcastRepository.save(findPodcast);

    return updatePodcast;
  }
}

export default UpdatePodcastService;
