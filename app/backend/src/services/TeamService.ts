import Team from '../database/models/Team';

export default class TeamsService {
  static async getTeams() {
    return Team.findAll();
  }

  static async findByPk(id: string) {
    const team = await Team.findByPk(id);
    if (!team) {
      throw new Error(404, 'There is no team with such id!');
    }
    return Team.findByPk(id);
  }
}
