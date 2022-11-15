import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import { validateToken } from '../services/jwtService';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    if (req.query.inProgress) {
      const result = this.findAllInProcess(req, res);
      return result;
    }
    const teams = await MatchService.getTeams();
    return res.status(200).json(teams);
  }

  static async findAllInProcess(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await MatchService.findAllInProcess(JSON.parse(inProgress as string));
    res.status(200).json(matches);
  }

  static async create(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    if (!authorization || !validateToken(authorization)) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const team = await MatchService.create(req.body);

    if (team) {
      return res.status(201).json(team);
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await MatchService.update(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(match);
  }

  static async updateFinish(req: Request, res: Response) {
    const { id } = req.params;
    await MatchService.updateFinish(id);
    return res.status(200).json({ message: 'Finished' });
  }
}
