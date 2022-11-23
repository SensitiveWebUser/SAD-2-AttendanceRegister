import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

export const SessionType = sequelize.define<SessionType>('session_type', {
  session_type_id: {
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  session_type_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

interface SessionType extends Model {
  session_type_id?: CreationOptional<string>;
  session_type_name: 'Lab' | 'Lecture';
}
