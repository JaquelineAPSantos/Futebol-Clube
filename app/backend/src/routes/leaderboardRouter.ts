import * as express from 'express';
import 'express-async-errors';
import { Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoute = express.Router();

leaderboardRoute.get('/home', (req: Request, res: Response) =>
  LeaderboardController.allMatches(req, res));

export default leaderboardRoute;
