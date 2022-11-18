import IMatch from './IMatch';

export default interface LeaderboardTeam {
  id: number,
  teamName: string,
  homeMatche: IMatch[],
  awayMatches: IMatch[],
}
