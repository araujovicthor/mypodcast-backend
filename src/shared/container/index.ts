import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import CategoryRepository from '@modules/categories/infra/typeorm/repositories/CategoryRepository';

import IChannelRepository from '@modules/channels/repositories/IChannelRepository';
import ChannelRepository from '@modules/channels/infra/typeorm/repositories/ChannelRepository';

import IFollowRepository from '@modules/channels/repositories/IFollowRepository';
import FollowRepository from '@modules/channels/infra/typeorm/repositories/FollowRepository';

import IPodcastRepository from '@modules/podcasts/repositories/IPodcastRepository';
import PodcastRepository from '@modules/podcasts/infra/typeorm/repositories/PodcastRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IChannelRepository>(
  'ChannelRepository',
  ChannelRepository,
);

container.registerSingleton<IFollowRepository>(
  'FollowRepository',
  FollowRepository,
);

container.registerSingleton<IPodcastRepository>(
  'PodcastRepository',
  PodcastRepository,
);
