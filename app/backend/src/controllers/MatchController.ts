import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import { validateToken } from '../services/jwtService';

export default class MatchController {
  static async getAll(_req: Request, res: Response) {
    const teams = await MatchService.getTeams();
    return res.status(200).json(teams);
  }

  static async saveInProgress(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      validateToken(authorization);
      const team = await MatchService.create(req.body);

      if (team) {
        return res.status(201).json(team);
      }
    }
  }
}
