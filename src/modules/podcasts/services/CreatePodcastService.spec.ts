import AppError from '@shared/errors/AppError';

import FakePodcastRepository from '../repositories/fakes/FakePodcastRepository';
import FakeChannelRepository from '@modules/channels/repositories/fakes/FakeChannelRepository';

import CreatePodcastService from './CreatePodcastService';

let fakePodcastRepository: FakePodcastRepository;
let fakeChannelRepository: FakeChannelRepository;

let createPodcastService: CreatePodcastService;

describe('CreatePodcastService', () => {
  beforeEach(() => {
    fakePodcastRepository = new FakePodcastRepository();
    fakeChannelRepository = new FakeChannelRepository();

    createPodcastService = new CreatePodcastService(
      fakePodcastRepository,
      fakeChannelRepository,
    );
  });

  it('should be able to create a new podcast', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    const podcast = await createPodcastService.execute({
      channelId: channel.id,
      title: 'Primeiro episódio',
      userId: 'ownerId',
    });

    await expect(podcast).toHaveProperty('id');
  });

  it('should not be able to create a podcast for a non-existent channel', async () => {
    await expect(
      createPodcastService.execute({
        channelId: 'non-existent-channel',
        title: 'Primeiro episódio',
        userId: 'ownerId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a podcast for a channel that user is not owner', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    await expect(
      createPodcastService.execute({
        channelId: channel.id,
        title: 'Primeiro episódio',
        userId: 'userId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
