import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from '@Database';
import { User } from './user';
import { Session } from './session';

export const Attendance = sequelize.define<Attendance>(
  'attendance',
  {
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    session_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    attended: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { underscored: true, timestamps: false, freezeTableName: true }
);

Attendance.belongsTo(User, { foreignKey: 'user_id' });
Attendance.belongsTo(Session, { foreignKey: 'session_id' });

interface Attendance extends Model {
  user_id?: CreationOptional<string>;
  session_id: string;
  attended: number;
}
