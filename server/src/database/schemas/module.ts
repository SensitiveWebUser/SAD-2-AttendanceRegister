import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';

export const Module = sequelize.define<Module>('module', {
  module_id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  module_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  module_leader: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Add foreign keys
Module.belongsTo(User, { foreignKey: 'module_leader' });

interface Module extends Model {
  module_id?: CreationOptional<number>;
  module_name: string;
  module_leader: number;
}
