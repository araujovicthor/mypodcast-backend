import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import { container } from 'tsyringe';

import CreatePodcastService from '@modules/podcasts/services/CreatePodcastService';
import UpdatePodcastService from '@modules/podcasts/services/UpdatePodcastService';
import DeletePodcastService from '@modules/podcasts/services/DeletePodcastService';

export default class PodcastsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { title, channelId } = request.body;

    const createPodcast = container.resolve(CreatePodcastService);

    const podcast = await createPodcast.execute({
      title,
      channelId,
      userId,
    });

    return response.json(instanceToInstance(podcast));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { id } = request.params;
    const { title } = request.body;

    const updatePodcast = container.resolve(UpdatePodcastService);

    const podcast = await updatePodcast.execute({ userId, id, title });

    return response.json(instanceToInstance(podcast));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { id } = request.params;

    const deletePodcast = container.resolve(DeletePodcastService);

    await deletePodcast.execute({ userId, id });

    return response.json();
  }
}
