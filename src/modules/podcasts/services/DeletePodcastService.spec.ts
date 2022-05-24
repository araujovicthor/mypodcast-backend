import AppError from '@shared/errors/AppError';

import FakePodcastRepository from '../repositories/fakes/FakePodcastRepository';

import DeletePodcastService from './DeletePodcastService';

let fakePodcastRepository: FakePodcastRepository;
let deletePodcastService: DeletePodcastService;

describe('DeletePodcastService', () => {
  beforeEach(() => {
    fakePodcastRepository = new FakePodcastRepository();

    deletePodcastService = new DeletePodcastService(fakePodcastRepository);
  });

  it('should be able to delete a podcast', async () => {
    const podcast = await fakePodcastRepository.create({
      title: 'Finanças',
      channelId: 'channelId',
    });

    podcast.channel.ownerId = 'ownerId';
    await fakePodcastRepository.save(podcast);

    await deletePodcastService.execute({ id: podcast.id, userId: 'ownerId' });

    const findPodcast = await fakePodcastRepository.findById(podcast.id);

    await expect(findPodcast?.deletedAt).not.toBeNull();
  });

  it('should not be able to delete a non-existent podcast', async () => {
    await expect(
      deletePodcastService.execute({
        id: 'non-existent-podcast',
        userId: 'ownerId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a podcast if user is not channel owner', async () => {
    const podcast = await fakePodcastRepository.create({
      title: 'Finanças',
      channelId: 'channelId',
    });

    podcast.channel.ownerId = 'ownerId';
    await fakePodcastRepository.save(podcast);

    await expect(
      deletePodcastService.execute({
        id: podcast.id,
        userId: 'userId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
