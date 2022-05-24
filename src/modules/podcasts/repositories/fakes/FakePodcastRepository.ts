import { v4 as uuid } from 'uuid';

import IPodcastRepository from '@modules/podcasts/repositories/IPodcastRepository';
import ICreatePodcastDTO from '@modules/podcasts/dtos/ICreatePodcastDTO';

import Podcast from '@modules/podcasts/infra/typeorm/entities/Podcast';

class FakePodcastRepository implements IPodcastRepository {
  private podcasts: Podcast[] = [];

  public async findById(id: string): Promise<Podcast | null> {
    const findPodcast = this.podcasts.find(podcast => podcast.id === id);

    return findPodcast ? findPodcast : null;
  }

  public async create({
    title,
    channelId,
  }: ICreatePodcastDTO): Promise<Podcast> {
    const podcast = new Podcast();

    Object.assign(podcast, {
      id: uuid(),
      title,
      channelId,
      channel: { id: channelId },
    });

    this.podcasts.push(podcast);

    return podcast;
  }

  public async save(podcast: Podcast): Promise<Podcast> {
    const findIndex = this.podcasts.findIndex(
      findPodcast => podcast.id === findPodcast.id,
    );
    this.podcasts[findIndex] = podcast;

    return podcast;
  }

  public async delete(podcast: Podcast): Promise<void> {
    const findIndex = this.podcasts.findIndex(
      findPodcast => podcast.id === findPodcast.id,
    );

    podcast.deletedAt = new Date();

    this.podcasts[findIndex] = podcast;
  }
}

export default FakePodcastRepository;
