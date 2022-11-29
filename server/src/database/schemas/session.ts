import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Module } from './module';
import { SessionType } from './sessionType';
import { User } from './user';

export const Session = sequelize.define<Session>(
  'session',
  {
    session_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    session_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tutor_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    module_id: {
      type: DataTypes.UUID,
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
  },
  { underscored: true, freezeTableName: true, timestamps: false }
);

Session.belongsTo(SessionType, { foreignKey: 'session_type_id' });
Session.belongsTo(User, { foreignKey: 'tutor_id' });
Session.belongsTo(Module, { foreignKey: 'module_id' });

interface Session extends Model {
  session_id?: CreationOptional<string>;
  session_type_id: string;
  tutor_id: string;
  module_id: string;
  start_timestamp: Date;
  end_timestamp: Date;
  code: string;
}
