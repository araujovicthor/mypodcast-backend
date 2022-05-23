import FakeChannelRepository from '../repositories/fakes/FakeChannelRepository';
import ListChannelsService from './ListChannelsService';

let fakeChannelRepository: FakeChannelRepository;
let listChannelsService: ListChannelsService;

describe('ListChannelsService', () => {
  beforeEach(() => {
    fakeChannelRepository = new FakeChannelRepository();
    listChannelsService = new ListChannelsService(fakeChannelRepository);
  });

  it('should be able to list all channels', async () => {
    await fakeChannelRepository.create({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId1',
      categories: [],
    });

    await fakeChannelRepository.create({
      name: 'Investidor Sardinha',
      description: 'Canal do Investidor Sardinha',
      ownerId: 'ownerId2',
      categories: [],
    });

    await fakeChannelRepository.create({
      name: 'Viver de Renda',
      description: 'Canal do Viver de Renda',
      ownerId: 'ownerId3',
      categories: [],
    });

    const channels = await listChannelsService.execute({});

    await expect(channels.length).toBe(3);
  });

  it('should be return a empty array if there is no channels', async () => {
    const channels = await listChannelsService.execute({});

    await expect(channels.length).toBe(0);
  });
});
