import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

import { UserType } from './userType';

export const User = sequelize.define<UserModel>('user', {
  user_id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    // get() {
    //   const rawValue = this.getDataValue('user_id')
    //   return rawValue ? rawValue : null;
    // }
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
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//Add user_type_id to user from user_type
User.belongsTo(UserType, { foreignKey: 'user_type_id' });

console.log('sequelize Setup User: ', sequelize.models.User);

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  user_id?: CreationOptional<string>;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  user_type_id: string;
}
