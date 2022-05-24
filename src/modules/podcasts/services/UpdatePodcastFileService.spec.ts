import AppError from '@shared/errors/AppError';

import FakePodcastRepository from '../repositories/fakes/FakePodcastRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdatePodcastFileService from './UpdatePodcastFileService';

let fakePodcastRepository: FakePodcastRepository;
let fakeStorageProvider: FakeStorageProvider;
let updatePodcastFileService: UpdatePodcastFileService;

describe('UpdatePodcastFileService', () => {
  beforeEach(() => {
    fakePodcastRepository = new FakePodcastRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updatePodcastFileService = new UpdatePodcastFileService(
      fakePodcastRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update podcast file', async () => {
    const podcast = await fakePodcastRepository.create({
      title: 'Finanças',
      channelId: 'channelId',
    });

    podcast.channel.ownerId = 'ownerId';
    await fakePodcastRepository.save(podcast);

    const updatePodcast = await updatePodcastFileService.execute({
      userId: 'ownerId',
      id: podcast.id,
      avatarFilename: 'audio.mp3',
    });

    await expect(updatePodcast.file).toBe('audio.mp3');
  });

  it('should not be able to update file for a non existing podcast', async () => {
    await expect(
      updatePodcastFileService.execute({
        userId: 'ownerId',
        id: 'non-existent-podcast',
        avatarFilename: 'audio.mp3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update file to podcast that is not owner', async () => {
    const podcast = await fakePodcastRepository.create({
      title: 'Finanças',
      channelId: 'channelId',
    });

    podcast.channel.ownerId = 'ownerId';
    await fakePodcastRepository.save(podcast);

    await expect(
      updatePodcastFileService.execute({
        userId: 'ownerId',
        id: podcast.id,
        avatarFilename: 'audio.mp3',
      }),
    );
  });

  it('should delete old file when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const podcast = await fakePodcastRepository.create({
      title: 'Finanças',
      channelId: 'channelId',
    });

    podcast.channel.ownerId = 'ownerId';
    await fakePodcastRepository.save(podcast);

    await updatePodcastFileService.execute({
      userId: 'ownerId',
      id: podcast.id,
      avatarFilename: 'audio.mp3',
    });

    const updatePodcast = await updatePodcastFileService.execute({
      userId: 'ownerId',
      id: podcast.id,
      avatarFilename: 'audio2.mp3',
    });

    await expect(deleteFile).toHaveBeenCalledWith('audio.mp3');
    await expect(updatePodcast.file).toBe('audio2.mp3');
  });
});
