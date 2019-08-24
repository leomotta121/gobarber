import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import Auth from './app/middlewares/Auth';
import UserValidation from './app/middlewares/UserValidation';

const routes = Router();

routes.post('/users', UserValidation.validateStoreUser, UserController.store);

routes.post('/session', SessionController.store);

export default routes;
