import { inject, injectable } from 'tsyringe';

import Channel from '../infra/typeorm/entities/Channel';

import IChannelRepository from '../repositories/IChannelRepository';

interface IRequest {
  categoryId?: string;
  userId?: string;
}

@injectable()
class ListChannelsService {
  constructor(
    @inject('ChannelRepository')
    private channelRepository: IChannelRepository,
  ) {}

  public async execute({ categoryId, userId }: IRequest): Promise<Channel[]> {
    const channels = await this.channelRepository.list(categoryId, userId);

    return channels;
  }
}

export default ListChannelsService;
