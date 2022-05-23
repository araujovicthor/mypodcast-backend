import { v4 as uuid } from 'uuid';

import IChannelRepository from '@modules/channels/repositories/IChannelRepository';
import ICreateChannelDTO from '@modules/channels/dtos/ICreateChannelDTO';

import Channel from '@modules/channels/infra/typeorm/entities/Channel';

class FakeChannelRepository implements IChannelRepository {
  private channels: Channel[] = [];

  public async list(): Promise<Channel[]> {
    return this.channels;
  }

  public async findById(id: string): Promise<Channel | null> {
    const findChannel = this.channels.find(channel => channel.id === id);

    return findChannel ? findChannel : null;
  }

  public async findByName(name: string): Promise<Channel | null> {
    const findChannel = this.channels.find(channel =>
      channel.name.toLowerCase().startsWith(name.toLowerCase()),
    );

    return findChannel ? findChannel : null;
  }

  public async create({
    name,
    description,
    ownerId,
    categories,
  }: ICreateChannelDTO): Promise<Channel> {
    const channel = new Channel();

    Object.assign(channel, {
      id: uuid(),
      name,
      description,
      ownerId,
      categories,
    });

    this.channels.push(channel);

    return channel;
  }

  public async save(channel: Channel): Promise<Channel> {
    const findIndex = this.channels.findIndex(
      findChannel => channel.id === findChannel.id,
    );
    this.channels[findIndex] = channel;

    return channel;
  }

  public async delete(channel: Channel): Promise<void> {
    const findIndex = this.channels.findIndex(
      findChannel => channel.id === findChannel.id,
    );

    channel.deletedAt = new Date();
    this.channels[findIndex] = channel;
  }
}

export default FakeChannelRepository;
