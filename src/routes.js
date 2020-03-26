import { Router } from 'express';
import authMiddlewares from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ForgotPasswordController from './app/controllers/ForgotPasswordController';

const routes = new Router();

routes.post('/create-user', UserController.store);
routes.post('/login', SessionController.store);
routes.post('/forgot', ForgotPasswordController.store);
routes.post('/recovery', ForgotPasswordController.update);

routes.use(authMiddlewares);
routes.put('/update-user', UserController.update);
routes.delete('/delete-user', UserController.destroy);

export default routes;
