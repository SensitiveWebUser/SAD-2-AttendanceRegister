import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from '../database';

export const SessionType = sequelize.define<SessionType>(
  'session_type',
  {
    session_type_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    session_type_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false, freezeTableName: true }
);

interface SessionType extends Model {
  session_type_id?: CreationOptional<string>;
  session_type_name: 'Lab' | 'Lecture';
}
