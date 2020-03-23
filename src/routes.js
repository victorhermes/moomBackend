import { Router } from 'express';
import authMiddlewares from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/create-user', UserController.store);
routes.post('/login', SessionController.store);

routes.use(authMiddlewares);
routes.put('/update-user', UserController.update);

export default routes;
