import AppError from '@shared/errors/AppError';

import FakePodcastRepository from '../repositories/fakes/FakePodcastRepository';

import UpdatePodcastService from './UpdatePodcastService';

let fakePodcastRepository: FakePodcastRepository;
let updatePodcastService: UpdatePodcastService;

describe('UpdatePodcastService', () => {
  beforeEach(() => {
    fakePodcastRepository = new FakePodcastRepository();

    updatePodcastService = new UpdatePodcastService(fakePodcastRepository);
  });

  it('should be able to update a podcast', async () => {
    const podcast = await fakePodcastRepository.create({
      title: 'Finanças',
      channelId: 'channelId',
    });

    podcast.channel.ownerId = 'ownerId';
    await fakePodcastRepository.save(podcast);

    const updatePodcast = await updatePodcastService.execute({
      id: podcast.id,
      userId: 'ownerId',
      title: 'Novo título',
    });

    await expect(updatePodcast.title).toBe('Novo título');
  });

  it('should not be able to update a non-existent podcast', async () => {
    await expect(
      updatePodcastService.execute({
        id: 'non-existent-podcast',
        userId: 'ownerId',
        title: 'Novo título',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a podcast if user is not channel owner', async () => {
    const podcast = await fakePodcastRepository.create({
      title: 'Finanças',
      channelId: 'channelId',
    });

    podcast.channel.ownerId = 'ownerId';
    await fakePodcastRepository.save(podcast);

    await expect(
      updatePodcastService.execute({
        id: podcast.id,
        userId: 'userId',
        title: 'Novo título',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
