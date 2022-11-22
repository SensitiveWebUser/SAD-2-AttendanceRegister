import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';
import { Module } from './module';
import { SessionType } from './sessionType';

export const Session = sequelize.define<Session>('session', {
  session_id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  session_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tutor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_timestamp: {
    type: DataTypes.DATE,
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
  session_id?: CreationOptional<number>;
  session_type_id: number;
  tutor_id: number;
  module_id: number;
  start_timestamp: Date;
  end_timestamp: Date;
  code: string;
}
