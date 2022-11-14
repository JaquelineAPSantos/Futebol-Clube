import * as express from 'express';
import 'express-async-errors';
import { Request, Response } from 'express';
import UserController from '../controllers/UserController';

const loginRoute = express.Router();

loginRoute.get('/users', (req: Request, res: Response) => UserController.getAll(req, res));
loginRoute.post('/', (req: Request, res: Response) => UserController.login(req, res));
loginRoute.get('/validate', (req: Request, res: Response) =>
  UserController.validateLogin(req, res));

export default loginRoute;
