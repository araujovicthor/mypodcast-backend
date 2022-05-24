import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import PodcastsController from '../controller/PodcastsController';
import PodcastsFileController from '../controller/PodcastsFileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const podcastsRouter = Router();
const podcastsController = new PodcastsController();
const podcastsFileController = new PodcastsFileController();

const upload = multer(uploadConfig.multerPlayer);

podcastsRouter.use(ensureAuthenticated);

podcastsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      channelId: Joi.string().uuid().required(),
    },
  }),
  podcastsController.create,
);

podcastsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  podcastsController.update,
);

podcastsRouter.patch(
  '/:id/file',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  upload.single('file'),
  podcastsFileController.update,
);

podcastsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  podcastsController.delete,
);

export default podcastsRouter;
