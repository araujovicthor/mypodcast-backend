import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';

import channelsRouter from '@modules/channels/infra/http/routes/channels.routes';

import podcastsRouter from '@modules/podcasts/infra/http/routes/podcasts.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/categories', categoriesRouter);

routes.use('/channels', channelsRouter);

routes.use('/podcasts', podcastsRouter);

export default routes;
