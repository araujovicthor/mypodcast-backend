import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IChannelRepository from '../repositories/IChannelRepository';

interface IRequest {
  ownerId: string;
  id: string;
}

@injectable()
class DeleteChannelService {
  constructor(
    @inject('ChannelRepository')
    private channelRepository: IChannelRepository,
  ) {}

  public async execute({ ownerId, id }: IRequest): Promise<void> {
    const findChannel = await this.channelRepository.findById(id);

    if (!findChannel) {
      throw new AppError('Channel does not exists', 404);
    }

    if (findChannel.ownerId !== ownerId) {
      throw new AppError('Only owner can delete a channel');
    }

    await this.channelRepository.delete(findChannel);
  }
}

export default DeleteChannelService;
