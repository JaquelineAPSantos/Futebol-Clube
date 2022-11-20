import { QueryTypes } from 'sequelize';
import ModelSequelize from '../database/models/index';
import { ILeaderboard, ILeaderboarService } from '../interfaces/ILeaderboard';

const leaderboardQuery = (query: string) =>
  `SELECT *, (totalVictories * 3 + totalDraws) AS totalPoints,
ROUND(((totalVictories * 3 + totalDraws) / (totalGames * 3) * 100), 2) AS efficiency
FROM (${query}) AS leaderboard
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC,
 goalsFavor DESC, goalsOwn DESC;`;

const leaderboardQuery2 = (team1: string, team2: string) => `SELECT 
te.team_name as name, 
SUM(${team1}_goals) as goalsFavor, 
SUM(${team2}_goals) AS goalsOwn, 
SUM(${team1}_goals - ${team2}_goals) AS goalsBalance,
SUM(${team1}_goals > ${team2}_goals) AS totalVictories,
SUM(${team1}_goals < ${team2}_goals) AS totalLosses,
SUM(${team1}_goals = ${team2}_goals) AS totalDraws, 
COUNT(*) AS totalGames 
FROM TRYBE_FUTEBOL_CLUBE.matches as ma
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as te
ON te.id = ma.${team1}
where in_progress = 0
GROUP BY te.team_name`;

export default class LeaderboardService implements ILeaderboarService {
  constructor(private model = ModelSequelize) {}

  async getLeaderboard(team1: string, team2: string): Promise<ILeaderboard[]> {
    return this.model.query(
      leaderboardQuery(leaderboardQuery2(team1, team2)),
      { type: QueryTypes.SELECT },
    );
  }
}
