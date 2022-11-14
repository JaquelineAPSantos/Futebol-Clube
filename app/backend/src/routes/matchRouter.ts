import * as express from 'express';
import 'express-async-errors';
import { Request, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchRoute = express.Router();

matchRoute.get('/', (req: Request, res: Response) => MatchController.getAll(req, res));

export default matchRoute;
