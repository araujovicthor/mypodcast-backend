import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import { container } from 'tsyringe';

import ListChannelsService from '@modules/channels/services/ListChannelsService';
import ShowChannelService from '@modules/channels/services/ShowChannelService';
import CreateChannelService from '@modules/channels/services/CreateChannelService';
import UpdateChannelService from '@modules/channels/services/UpdateChannelService';
import DeleteChannelService from '@modules/channels/services/DeleteChannelService';

export default class ChannelsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { categoryId, favorites } = request.query;

    const listChannels = container.resolve(ListChannelsService);

    const channels = await listChannels.execute({
      categoryId: categoryId && String(categoryId),
      userId: Boolean(favorites) === true ? userId : undefined,
    });

    return response.json(instanceToInstance(channels));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { id } = request.params;

    const showChannel = container.resolve(ShowChannelService);

    const channel = await showChannel.execute({ userId, id });

    return response.json(instanceToInstance(channel));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const ownerId = request.user.id;

    const { name, description, categoriesIds } = request.body;

    const createChannel = container.resolve(CreateChannelService);

    const channel = await createChannel.execute({
      ownerId,
      name,
      description,
      categoriesIds,
    });

    return response.json(instanceToInstance(channel));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const ownerId = request.user.id;

    const { id } = request.params;
    const { name, description } = request.body;

    const updateChannel = container.resolve(UpdateChannelService);

    const channel = await updateChannel.execute({
      id,
      name,
      description,
      ownerId,
    });

    return response.json(instanceToInstance(channel));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const ownerId = request.user.id;

    const { id } = request.params;

    const deleteChannel = container.resolve(DeleteChannelService);

    await deleteChannel.execute({ ownerId, id });

    return response.json();
  }
}
