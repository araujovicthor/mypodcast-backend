import { Repository } from 'typeorm';

import IPodcastRepository from '@modules/podcasts/repositories/IPodcastRepository';
import ICreatePodcastDTO from '@modules/podcasts/dtos/ICreatePodcastDTO';
import Podcast from '../entities/Podcast';

import { dataSource } from '@shared/infra/typeorm/dataSource';

class PodcastRepository implements IPodcastRepository {
  private ormRepository: Repository<Podcast>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Podcast);
  }

  public async findById(id: string): Promise<Podcast | null> {
    const findPodcast = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['channel'],
    });

    return findPodcast;
  }

  public async create({
    title,
    channelId,
  }: ICreatePodcastDTO): Promise<Podcast> {
    const podcast = this.ormRepository.create({
      title,
      channelId,
    });

    await this.ormRepository.save(podcast);

    return podcast;
  }

  public async save(podcast: Podcast): Promise<Podcast> {
    await this.ormRepository.save(podcast);

    return podcast;
  }

  public async delete(podcast: Podcast): Promise<void> {
    await this.ormRepository.save({ ...podcast, deletedAt: new Date() });
  }
}

export default PodcastRepository;
