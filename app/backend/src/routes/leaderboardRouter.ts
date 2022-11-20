import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.getAllHome);
leaderboardRouter.get('/away', leaderboardController.getAllAway);

export default leaderboardRouter;
