import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPodcastRepository from '../repositories/IPodcastRepository';

interface IRequest {
  userId: string;
  id: string;
}

@injectable()
class DeletePodcastService {
  constructor(
    @inject('PodcastRepository')
    private podcastRepository: IPodcastRepository,
  ) {}

  public async execute({ userId, id }: IRequest): Promise<void> {
    const findPodcast = await this.podcastRepository.findById(id);

    if (!findPodcast) {
      throw new AppError('Podcast does not exists', 404);
    }

    if (findPodcast.channel.ownerId !== userId) {
      throw new AppError('Only owner can delete a podcast');
    }

    await this.podcastRepository.delete(findPodcast);
  }
}

export default DeletePodcastService;
