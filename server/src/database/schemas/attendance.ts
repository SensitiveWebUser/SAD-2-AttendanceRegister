import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

export const Attendance = sequelize.define<Attendance>('attendance', {
  user_id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    allowNull: false,
  },
  session_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attended: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

interface Attendance
  extends Model<
    InferAttributes<Attendance>,
    InferCreationAttributes<Attendance>
  > {
  user_id?: CreationOptional<string>;
  session_id: string;
  attended: string;
}
