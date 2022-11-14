import { Request, Response } from 'express';
import MatcheService from '../services/MatchService';

export default class MatchController {
  static async getAll(_req: Request, res: Response) {
    const teams = await MatcheService.getTeams();
    return res.status(200).json(teams);
  }
}
