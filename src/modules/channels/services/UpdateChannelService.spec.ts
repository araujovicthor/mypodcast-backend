import AppError from '@shared/errors/AppError';

import FakeChannelRepository from '../repositories/fakes/FakeChannelRepository';

import UpdateChannelService from './UpdateChannelService';

let fakeChannelRepository: FakeChannelRepository;
let updateChannelService: UpdateChannelService;

describe('UpdateChannelService', () => {
  beforeEach(() => {
    fakeChannelRepository = new FakeChannelRepository();

    updateChannelService = new UpdateChannelService(fakeChannelRepository);
  });

  it('should be able to update a channel', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    await updateChannelService.execute({
      ownerId: 'ownerId',
      id: channel.id,
      name: 'Investidor Sardinha',
      description: 'Canal do Investidor Sardinha',
    });

    const findChannel = await fakeChannelRepository.findById(channel.id);

    await expect(findChannel?.name).toBe('Investidor Sardinha');
    await expect(findChannel?.description).toBe('Canal do Investidor Sardinha');
  });

  it('should not be able to update a non-existent channel', async () => {
    await expect(
      updateChannelService.execute({
        ownerId: 'ownerId',
        id: 'no-existent-channel-id',
        name: 'Investidor Sardinha',
        description: 'Canal do Investidor Sardinha',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a channel that is not owner', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    await expect(
      updateChannelService.execute({
        ownerId: 'anotherUserId',
        id: channel.id,
        name: 'Investidor Sardinha',
        description: 'Canal do Investidor Sardinha',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
