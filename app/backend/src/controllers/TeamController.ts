import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamService.getTeams();
    return res.status(200).json(teams);
  }

  static async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.findByPk(id);
    return res.status(200).json(team);
  }
}
