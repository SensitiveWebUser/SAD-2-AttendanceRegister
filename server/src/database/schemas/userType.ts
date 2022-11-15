import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '../database';

export const UserType = sequelize.define<UserType>('user_type', {
  user_type_id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_type_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

interface UserType
  extends Model<InferAttributes<UserType>, InferCreationAttributes<UserType>> {
  user_type_id?: CreationOptional<string>;
  user_type_name: string;
}
