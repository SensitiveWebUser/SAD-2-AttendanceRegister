import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

export const SessionType = sequelize.define<SessionType>('session_type', {
  session_type_id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  session_type_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

interface SessionType
  extends Model<
    InferAttributes<SessionType>,
    InferCreationAttributes<SessionType>
  > {
  session_type_id?: CreationOptional<string>;
  session_type_name: string;
}
