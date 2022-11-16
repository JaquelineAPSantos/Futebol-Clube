import * as express from 'express';
import 'express-async-errors';
import { Request, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchRoute = express.Router();

matchRoute.get('/matches', (req: Request, res: Response) => MatchController.getAll(req, res));
matchRoute.get('/search', (req: Request, res: Response) =>
  MatchController.findAllInProcess(req, res));
matchRoute.post('/matches', (req: Request, res: Response) =>
  MatchController.create(req, res));
matchRoute.patch('/matches/:id', (req: Request, res: Response) => MatchController.update(req, res));
matchRoute.patch('/matches/:id/finish', (req: Request, res: Response) =>
  MatchController.updateFinish(req, res));

export default matchRoute;
