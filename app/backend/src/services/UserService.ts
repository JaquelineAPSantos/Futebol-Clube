import User from '../database/models/User';
import IUser from '../interfaces/IUser';

export default class UserService {
  static async getUsers() {
    return User.findAll();
  }

  static async findOne(email: string) {
    return User.findOne({ where: { email } });
  }

  static async createUser(user: IUser) {
    return User.create({
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    });
  }
}
