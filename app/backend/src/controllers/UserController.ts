import bcrypt = require('bcryptjs');
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import validateLogin from '../middlewares/validateLogin';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    validateLogin({ email, password });
    const user = await UserService.findOne(email);
    if (!user) res.status(400).json({ message: 'UnauthorizedError' });
    if (user) bcrypt.compareSync(password, user.password);

    return res.status(200).json(user);
  }
}
