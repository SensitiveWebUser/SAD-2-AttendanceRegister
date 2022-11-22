import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';
import { Module } from './module';
import { SessionType } from './sessionType';

export const Session = sequelize.define<Session>('session', {
  session_id: {
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  session_type_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  tutor_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  module_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  start_timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  end_timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
});

//Add foreign keys
Session.belongsTo(SessionType, { foreignKey: 'session_type_id' });
Session.belongsTo(User, { foreignKey: 'tutor_id' });
Session.belongsTo(Module, { foreignKey: 'module_id' });

interface Session extends Model {
  session_id?: CreationOptional<string>;
  session_type_id: string;
  tutor_id: string;
  module_id: string;
  start_timestamp: number;
  end_timestamp: number;
  code: string;
}
