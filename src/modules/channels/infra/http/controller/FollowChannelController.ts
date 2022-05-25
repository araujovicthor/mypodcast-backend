import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FollowChannelService from '@modules/channels/services/FollowChannelService';
import { instanceToInstance } from 'class-transformer';

export default class ChannelsAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { id: channelId } = request.params;

    const followChannel = container.resolve(FollowChannelService);

    const channel = await followChannel.execute({
      userId,
      channelId,
    });

    return response.json(instanceToInstance(channel));
  }
}
