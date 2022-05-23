import Channel from '../infra/typeorm/entities/Channel';

import ICreateChannelDTO from '../dtos/ICreateChannelDTO';

export default interface IChannelRepository {
  list(categoryId?: string): Promise<Channel[]>;
  findById(id: string): Promise<Channel | null>;
  findByName(title: string): Promise<Channel | null>;
  create(data: ICreateChannelDTO): Promise<Channel>;
  save(channel: Channel): Promise<Channel>;
  delete(channel: Channel): Promise<void>;
}
