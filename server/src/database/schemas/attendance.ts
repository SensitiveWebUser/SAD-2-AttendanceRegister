import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';
import { Session } from './session';

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
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Add foreign keys
Attendance.belongsTo(User, { foreignKey: 'user_id' });
Attendance.belongsTo(Session, { foreignKey: 'session_id' });

interface Attendance
  extends Model<
    InferAttributes<Attendance>,
    InferCreationAttributes<Attendance>
  > {
  user_id?: CreationOptional<string>;
  session_id: string;
  attended: 'true' | 'late' | 'false';
}
