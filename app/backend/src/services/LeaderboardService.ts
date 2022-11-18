import Team from '../database/models/Team';
import Match from '../database/models/Match';
// import IMatch from '../interfaces/IMatch';

export default class LeaderboardService {
  private static getLeaderboard = {
    totalPoints: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
  };

  static async allMatches() {
    await Team.findAll({
      include: [
        { model: Match, as: 'homeMatches', where: { inProgress: false } },
        { model: Match, as: 'awayMatches', where: { inProgress: false } },
      ],
    });
  }
}
