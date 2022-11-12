import { DataTypes } from 'sequelize';

import { sequelize } from '../database';

import { UserType } from './userType';

export const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middle_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//Add user_type_id to user from user_type
User.belongsTo(UserType, { foreignKey: 'user_type_id' });

console.log('sequelize Setup User: ', sequelize.models.User);
