import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Channel from '../infra/typeorm/entities/Channel';

import IChannelRepository from '../repositories/IChannelRepository';

interface IRequest {
  ownerId: string;
  id: string;
  name?: string;
  description?: string;
}

@injectable()
class UpdateChannelService {
  constructor(
    @inject('ChannelRepository')
    private channelRepository: IChannelRepository,
  ) {}

  public async execute({
    ownerId,
    id,
    name,
    description,
  }: IRequest): Promise<Channel> {
    const findChannel = await this.channelRepository.findById(id);

    if (!findChannel) {
      throw new AppError('Channel does not exists', 404);
    }

    if (findChannel.ownerId !== ownerId) {
      throw new AppError('Only owner can delete a channel');
    }

    if (name) findChannel.name = name;
    if (description) findChannel.description = description;

    const updateChannel = await this.channelRepository.save(findChannel);

    return updateChannel;
  }
}

export default UpdateChannelService;
