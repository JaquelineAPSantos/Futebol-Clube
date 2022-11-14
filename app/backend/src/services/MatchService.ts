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
}
