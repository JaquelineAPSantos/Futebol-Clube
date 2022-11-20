import IMatch from './IMatch';

export default interface LeaderboardTeam {
  id?: number,
  teamName: string,
  homeMatches: IMatch[],
  awayMatches: IMatch[],
}
