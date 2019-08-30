import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import AvailableController from './app/controllers/AvailableController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AppointmentsController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = express.Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.get('/providers', authMiddleware, ProviderController.index);
routes.get(
  '/providers/:providerId/available',
  authMiddleware,
  AvailableController.index
);

routes.get('/appointments', authMiddleware, AppointmentsController.index);
routes.post('/appointments', authMiddleware, AppointmentsController.store);
routes.delete(
  '/appointments/:id',
  authMiddleware,
  AppointmentsController.delete
);

routes.get('/schedule', authMiddleware, ScheduleController.index);

routes.get('/notifications', authMiddleware, NotificationController.index);
routes.put('/notifications/:id', authMiddleware, NotificationController.update);

routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

export default routes;
