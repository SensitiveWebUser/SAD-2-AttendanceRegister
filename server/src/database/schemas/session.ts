import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';
import { Module } from './module';
import { SessionType } from './sessionType';

export const Session = sequelize.define<Session>('session', {
  session_id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  session_type_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tutor_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  module_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_timestamp: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_timestamp: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//Add foreign keys
Session.belongsTo(SessionType, { foreignKey: 'session_type_id' });
Session.belongsTo(User, { foreignKey: 'tutor_id' });
Session.belongsTo(Module, { foreignKey: 'module_id' });

interface Session
  extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
  session_id?: CreationOptional<string>;
  session_type_id: string;
  tutor_id: string;
  module_id: string;
  start_timestamp: string;
  end_timestamp: string;
  code: string;
}
