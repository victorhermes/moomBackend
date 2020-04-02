import { Router } from 'express';
import authMiddlewares from './app/middlewares/auth';
import { is } from './app/middlewares/acl';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ForgotPasswordController from './app/controllers/ForgotPasswordController';
import UserTeamController from './app/controllers/UserTeamController';
import SessionTeamController from './app/controllers/SessionTeamController';
import PermissionController from './app/controllers/PermissionController';
import RoleController from './app/controllers/RoleController';

const routes = new Router();

routes.post('/signin', UserController.store);
routes.post('/login', SessionController.store);
routes.post('/forgot', ForgotPasswordController.store);
routes.post('/recovery', ForgotPasswordController.update);

routes.post('/create-user-team', UserTeamController.store);
routes.post('/login-user-team', SessionTeamController.store);

routes.use(authMiddlewares);
// uma dica de segurança seria criar uma authMIddleware para aluno e outra para colaboradores
routes.get('/roles', RoleController.index);
routes.post('/roles', RoleController.store);
routes.put('/roles/:id', RoleController.update);

routes.get(
    '/permissions',
    is(['create_csskdsadkasontent', 'visitor']),
    PermissionController.index
);
routes.post('/permissions', PermissionController.store);
routes.put('/permissions/:id', is(['visitor']), PermissionController.update);

routes.put('/update-user', UserController.update);
routes.delete('/delete-user', UserController.destroy);

export default routes;
