import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CategoriesController from '../controller/CategoriesController';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import isAdmin from '@modules/users/infra/http/middlewares/isAdmin';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.use(ensureAutheticated);

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
