import AppError from '@shared/errors/AppError';

import FakeChannelRepository from '../repositories/fakes/FakeChannelRepository';
import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';

import CreateChannelService from './CreateChannelService';

let fakeChannelRepository: FakeChannelRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let createChannelService: CreateChannelService;

describe('CreateChannelService', () => {
  beforeEach(() => {
    fakeChannelRepository = new FakeChannelRepository();
    fakeCategoryRepository = new FakeCategoryRepository();

    createChannelService = new CreateChannelService(
      fakeChannelRepository,
      fakeCategoryRepository,
    );
  });

  it('should be able to create a new channel', async () => {
    const category = await fakeCategoryRepository.create({
      title: 'Finanças',
    });

    const channel = await createChannelService.execute({
      name: 'Primo Rico',
      description: 'Canal do Primo Rico',
      ownerId: 'ownerId',
      categoriesIds: [category.id],
    });

    await expect(channel).toHaveProperty('id');
  });

  it('should not be able to create a channel without category', async () => {
    await expect(
      createChannelService.execute({
        name: 'Primo Rico',
        description: 'Canal do Primo Rico',
        ownerId: 'ownerId',
        categoriesIds: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a channel without any valid category', async () => {
    await fakeCategoryRepository.create({
      title: 'Finanças',
    });

    await expect(
      createChannelService.execute({
        name: 'Primo Rico',
        description: 'Canal do Primo Rico',
        ownerId: 'ownerId',
        categoriesIds: ['invalid-category'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
