import * as express from 'express';
import { Request, Response } from 'express';
import UserController from '../controllers/UserController';

const loginRoute = express.Router();

loginRoute.post('/', (req: Request, res: Response) => UserController.login(req, res));

export default loginRoute;
