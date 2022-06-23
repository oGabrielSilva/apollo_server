import e from 'express';
import UserController from '../Controllers/UserController';

const Router = e.Router();

Router.get('/', (_, res) => res.status(200).json({ hello: 'Tail Book' }));

//User account
Router.post('/account/create', UserController.store);

export default Router;
