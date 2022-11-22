import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';
import { Session } from './session';

export const Attendance = sequelize.define<Attendance>('attendance', {
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    allowNull: false,
  },
  session_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attended: {
    type: DataTypes.TIME,
    allowNull: true,
  },
});

// Add foreign keys
Attendance.belongsTo(User, { foreignKey: 'user_id' });
Attendance.belongsTo(Session, { foreignKey: 'session_id' });

interface Attendance extends Model {
  user_id?: CreationOptional<number>;
  session_id: number;
  attended: Date;
}
