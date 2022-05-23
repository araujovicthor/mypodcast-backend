import AppError from '@shared/errors/AppError';

import FakeChannelRepository from '../repositories/fakes/FakeChannelRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateChannelAvatarService from './UpdateChannelAvatarService';

let fakeChannelRepository: FakeChannelRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateChannelAvatarService: UpdateChannelAvatarService;

describe('UpdateChannelAvatarService', () => {
  beforeEach(() => {
    fakeChannelRepository = new FakeChannelRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateChannelAvatarService = new UpdateChannelAvatarService(
      fakeChannelRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update channel avatar', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    const updateChannel = await updateChannelAvatarService.execute({
      ownerId: 'ownerId',
      id: channel.id,
      avatarFilename: 'avatar.jpeg',
    });

    await expect(updateChannel.avatar).toBe('avatar.jpeg');
  });

  it('should not be able to update avatar for a non existing user', async () => {
    await expect(
      updateChannelAvatarService.execute({
        ownerId: 'ownerId',
        id: 'no-existent-channel-id',
        avatarFilename: 'avatar.jpeg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update avatar to channel that is not owner', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    await expect(
      updateChannelAvatarService.execute({
        ownerId: 'anotherUserId',
        id: channel.id,
        avatarFilename: 'avatar.jpeg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    await updateChannelAvatarService.execute({
      ownerId: 'ownerId',
      id: channel.id,
      avatarFilename: 'avatar.jpeg',
    });

    const updateChannel = await updateChannelAvatarService.execute({
      ownerId: 'ownerId',
      id: channel.id,
      avatarFilename: 'avatar2.jpeg',
    });

    await expect(deleteFile).toHaveBeenCalledWith('avatar.jpeg');
    await expect(updateChannel.avatar).toBe('avatar2.jpeg');
  });
});
