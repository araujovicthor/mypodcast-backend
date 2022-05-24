import Podcast from '../infra/typeorm/entities/Podcast';

import ICreatePodcastDTO from '../dtos/ICreatePodcastDTO';

export default interface IPodcastRepository {
  findById(id: string): Promise<Podcast | null>;
  create(data: ICreatePodcastDTO): Promise<Podcast>;
  save(podcast: Podcast): Promise<Podcast>;
  delete(podcast: Podcast): Promise<void>;
}
