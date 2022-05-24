import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ChannelsController from '../controller/ChannelsController';
import ChannelsAvatarController from '../controller/ChannelsAvatarController';
import FollowChannelController from '../controller/FollowChannelController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const channelsRouter = Router();
const channelsController = new ChannelsController();
const channelsAvatarController = new ChannelsAvatarController();
const followChannelController = new FollowChannelController();

const upload = multer(uploadConfig.multerImage);

channelsRouter.use(ensureAuthenticated);

channelsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      categoryId: Joi.string().uuid(),
      favorites: Joi.bool(),
    },
  }),
  channelsController.list,
);

channelsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  channelsController.show,
);

channelsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      categoriesIds: Joi.array()
        .items(Joi.string().uuid().required())
        .min(1)
        .required(),
    },
  }),
  channelsController.create,
);

channelsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
    },
  }),
  channelsController.update,
);

channelsRouter.patch(
  '/:id/avatar',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  upload.single('avatar'),
  channelsAvatarController.update,
);

channelsRouter.put(
  '/:id/follow',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  followChannelController.update,
);

channelsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  channelsController.delete,
);

export default channelsRouter;
