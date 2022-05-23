import AppError from '@shared/errors/AppError';

import FakeChannelRepository from '../repositories/fakes/FakeChannelRepository';

import DeleteChannelService from './DeleteChannelService';

let fakeChannelRepository: FakeChannelRepository;
let deleteChannelService: DeleteChannelService;

describe('DeleteChannelService', () => {
  beforeEach(() => {
    fakeChannelRepository = new FakeChannelRepository();

    deleteChannelService = new DeleteChannelService(fakeChannelRepository);
  });

  it('should be able to delete a category', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    await deleteChannelService.execute({ ownerId: 'ownerId', id: channel.id });

    const findChannel = await fakeChannelRepository.findById(channel.id);

    await expect(findChannel).toHaveProperty('deletedAt');
  });

  it('should not be able to delete a non-existent channel', async () => {
    await expect(
      deleteChannelService.execute({
        ownerId: 'ownerId',
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete if not owner', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    await expect(
      deleteChannelService.execute({
        ownerId: 'anotherUserId',
        id: channel.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
