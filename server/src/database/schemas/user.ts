import { Model, DataTypes } from 'sequelize';

import { sequelize } from '@Database';

import { UserType } from './userType';

export const User = sequelize.define<UserModel>('user', {
  user_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  middle_name: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_type_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
});

//Add user_type_id to user from user_type
User.belongsTo(UserType, { foreignKey: 'user_type_id' });

interface UserModel extends Model {
  user_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  user_type_id: string;
}
