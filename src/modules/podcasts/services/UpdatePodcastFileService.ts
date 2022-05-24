import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Podcast from '../infra/typeorm/entities/Podcast';
import IPodcastRepository from '../repositories/IPodcastRepository';

interface IRequest {
  userId: string;
  id: string;
  avatarFilename: string;
}

@injectable()
class UpdatePodcastFileService {
  constructor(
    @inject('PodcastRepository')
    private podcastRepository: IPodcastRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    userId,
    id,
    avatarFilename,
  }: IRequest): Promise<Podcast> {
    const findPodcast = await this.podcastRepository.findById(id);

    if (!findPodcast) {
      throw new AppError('Podcast does not exists', 404);
    }

    if (findPodcast.channel.ownerId !== userId) {
      throw new AppError('Only owner can delete a podcast');
    }

    if (findPodcast.file) {
      await this.storageProvider.deleteFile(findPodcast.file);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    findPodcast.file = filename;
    await this.podcastRepository.save(findPodcast);

    return findPodcast;
  }
}

export default UpdatePodcastFileService;
