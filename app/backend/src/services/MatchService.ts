import Match from '../database/models/Match';
import Team from '../database/models/Team';
import TeamService from './TeamService';
import IMatch from '../interfaces/IMatch';

export default class MatchService {
  static async getTeams(): Promise<IMatch[]> {
    return Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
  }

  static async findAllInProcess(inProgress: boolean): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    });

    return matches;
  }

  static async verifyTeams(teams: { homeTeam: number, awayTeam: number }) {
    await TeamService.findByPk(teams.homeTeam);
    await Team.findByPk(teams.awayTeam);
    return new Error('There is no team with such id!');
  }

  static async create(body: {
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number }) {
    await this.verifyTeams({ homeTeam: body.homeTeam, awayTeam: body.awayTeam });
    const match: IMatch = await Match.create({
      homeTeam: body.homeTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeam: body.awayTeam,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    });

    return match;
  }

  static async update(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    return Match.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
  }

  static async updateFinish(id: string) {
    return Match.update({ inProgress: false }, {
      where: { id },
    });
  }
}
