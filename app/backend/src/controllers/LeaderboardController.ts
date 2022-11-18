import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async allMatches(_req: Request, res: Response) {
    const teams = await LeaderboardService.allMatches();

    return res.status(200).json(teams);
  }

  // static async homeMatches(_req: Request, res: Response) {
  //   const teams = await LeaderboardService.homeMatches();

  //   res.status(200).json(teams);
  // }
}
