import AppError from '@shared/errors/AppError';
import FakeChannelRepository from '../repositories/fakes/FakeChannelRepository';
import FakeFollowRepository from '../repositories/fakes/FakeFollowRepository';
import ShowChannelService from './ShowChannelService';

let fakeChannelRepository: FakeChannelRepository;
let fakeFollowRepository: FakeFollowRepository;

let showChannelService: ShowChannelService;

describe('ShowChannelService', () => {
  beforeEach(() => {
    fakeChannelRepository = new FakeChannelRepository();
    fakeFollowRepository = new FakeFollowRepository();

    showChannelService = new ShowChannelService(
      fakeChannelRepository,
      fakeFollowRepository,
    );
  });

  it('should be able to show a channel', async () => {
    const channel = await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId1',
      categories: [],
    });

    const showChannel = await showChannelService.execute({
      userId: 'userId',
      id: channel.id,
    });

    await expect(showChannel.id).toBe(channel.id);
  });

  it('should be return a empty array if there is no channels', async () => {
    await expect(
      showChannelService.execute({
        userId: 'userId',
        id: 'no-existent-channel-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
