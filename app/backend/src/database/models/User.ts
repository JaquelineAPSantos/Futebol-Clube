import { Model, INTEGER, STRING } from 'sequelize';
import database from '.';

class User extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

User.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: STRING,
    allowNull: false,
  },

  role: {
    type: STRING,
    allowNull: false,
  },

  email: {
    type: STRING,
    allowNull: false,
  },

  password: {
    type: STRING,
    allowNull: false,
  },

}, {
  sequelize: database,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default User;
