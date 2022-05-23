import AppError from '@shared/errors/AppError';

import FakeChannelRepository from '../repositories/fakes/FakeChannelRepository';
import FakeFollowRepository from '../repositories/fakes/FakeFollowRepository';

import FollowChannelService from './FollowChannelService';

let fakeChannelRepository: FakeChannelRepository;
let fakeFollowRepository: FakeFollowRepository;

let followChannelService: FollowChannelService;

describe('FollowChannelService', () => {
  beforeEach(() => {
    fakeChannelRepository = new FakeChannelRepository();
    fakeFollowRepository = new FakeFollowRepository();

    followChannelService = new FollowChannelService(
      fakeChannelRepository,
      fakeFollowRepository,
    );
  });

  it('should be able to follow/unfollow a channel', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categories: [],
    });

    await followChannelService.execute({
      userId: 'userId',
      channelId: channel.id,
    });

    const listFollow1 = await fakeFollowRepository.listByUserId('userId');
    await expect(listFollow1.length).toBe(1);

    await followChannelService.execute({
      userId: 'userId',
      channelId: channel.id,
    });

    const listFollow2 = await fakeFollowRepository.listByUserId('userId');
    await expect(listFollow2.length).toBe(0);
  });

  it('should not be able to follow a non-existent channel', async () => {
    await expect(
      followChannelService.execute({
        userId: 'userId',
        channelId: 'no-existent-channel-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
