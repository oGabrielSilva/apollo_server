import e from 'express';
import SessionController from '../Controllers/SessionController';
import UserController from '../Controllers/UserController';
import authToken from '../Middleware/authToken';

const Router = e.Router();

Router.get('/', (_, res) => res.status(200).json({ hello: 'Tail Book' }));

//User account
Router.get('/account', authToken, SessionController.index);
Router.post('/account/signin', UserController.index);
Router.post('/account/create', UserController.store);
Router.post('/account/signout', authToken, SessionController.signOut);

export default Router;
