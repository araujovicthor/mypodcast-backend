import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateChannelAvatarService from '@modules/channels/services/UpdateChannelAvatarService';

export default class ChannelsAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const ownerId = request.user.id;
    const { id } = request.params;

    const updateChannelAvatar = container.resolve(UpdateChannelAvatarService);

    const channel = await updateChannelAvatar.execute({
      ownerId,
      id,
      avatarFilename: request.file?.filename || '',
    });

    return response.json(instanceToInstance(channel));
  }
}
