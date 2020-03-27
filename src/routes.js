import { Router } from 'express';
import authMiddlewares from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ForgotPasswordController from './app/controllers/ForgotPasswordController';
import UserTeamController from './app/controllers/UserTeamController';
import SessionTeamController from './app/controllers/SessionTeamController';

const routes = new Router();

routes.post('/signin', UserController.store);
routes.post('/login', SessionController.store);
routes.post('/forgot', ForgotPasswordController.store);
routes.post('/recovery', ForgotPasswordController.update);

routes.post('/create-user-team', UserTeamController.store);
routes.post('/login-user-team', SessionTeamController.store);

routes.use(authMiddlewares);
routes.put('/update-user', UserController.update);
routes.delete('/delete-user', UserController.destroy);

export default routes;
