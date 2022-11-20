import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  getAllHome = async (_req: Request, res: Response) => {
    const leaderHome = await this.leaderboardService.getLeaderboard('home_team', 'away_team');
    return res.status(200).json(leaderHome);
  };

  getAllAway = async (_req: Request, res: Response) => {
    const leaderHome = await this.leaderboardService.getLeaderboard('away_team', 'home_team');
    return res.status(200).json(leaderHome);
  };
}
