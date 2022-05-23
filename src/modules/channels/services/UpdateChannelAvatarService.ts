import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IChannelRepository from '../repositories/IChannelRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Channel from '../infra/typeorm/entities/Channel';

interface IRequest {
  ownerId: string;
  id: string;
  avatarFilename: string;
}

@injectable()
class UpdateChannelAvatarService {
  constructor(
    @inject('ChannelRepository')
    private channelRepository: IChannelRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    ownerId,
    id,
    avatarFilename,
  }: IRequest): Promise<Channel> {
    const findChannel = await this.channelRepository.findById(id);

    if (!findChannel) {
      throw new AppError('Channel does not exists', 404);
    }

    if (findChannel.ownerId !== ownerId) {
      throw new AppError('Only owner can delete a channel');
    }

    if (findChannel.avatar) {
      await this.storageProvider.deleteFile(findChannel.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    findChannel.avatar = filename;
    await this.channelRepository.save(findChannel);

    return findChannel;
  }
}

export default UpdateChannelAvatarService;
