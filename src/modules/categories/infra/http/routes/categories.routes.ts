import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CategoriesController from '../controller/CategoriesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import isAdmin from '@modules/users/infra/http/middlewares/isAdmin';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', categoriesController.list);

categoriesRouter.use(isAdmin);

categoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  categoriesController.create,
);

categoriesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  categoriesController.update,
);

categoriesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoriesController.delete,
);

export default categoriesRouter;
