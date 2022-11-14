import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchesService {
  static async getTeams() {
    return Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
  }

  static async create(body: {
    homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number }) {
    const match = {
      homeTeam: body.homeTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeam: body.awayTeam,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    };

    return Match.create(match);
  }
}
