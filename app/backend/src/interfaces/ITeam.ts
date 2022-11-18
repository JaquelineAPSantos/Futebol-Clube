import IMatch from './IMatch';

export default interface Team {
  id?: number;
  teamName: string;
  homeMatches: IMatch[],
  awayMatches: IMatch[],
}
