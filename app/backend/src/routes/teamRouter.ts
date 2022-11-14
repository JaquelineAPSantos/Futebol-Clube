import * as express from 'express';
import 'express-async-errors';
import { Request, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamRoute = express.Router();

teamRoute.get('/teams', (req: Request, res: Response) => TeamController.getAll(req, res));
teamRoute.get('/teams/:id', (req: Request, res: Response) => TeamController.findByPk(req, res));

export default teamRoute;
