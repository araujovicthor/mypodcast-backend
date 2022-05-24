import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdatePodcastFileService from '@modules/podcasts/services/UpdatePodcastFileService';

export default class PodcastsFileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { id } = request.params;

    const updatePodcastFile = container.resolve(UpdatePodcastFileService);

    const podcast = await updatePodcastFile.execute({
      userId,
      id,
      avatarFilename: request.file?.filename || '',
    });

    return response.json(instanceToInstance(podcast));
  }
}
