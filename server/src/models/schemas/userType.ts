import { DataTypes } from 'sequelize';

import { sequelize } from '../database';

export const UserType = sequelize.define('user_type', {
  user_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  user_type_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
