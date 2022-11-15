import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';

export const Module = sequelize.define<Module>('module', {
  module_id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  module_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  module_leader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Add foreign keys
Module.belongsTo(User, { foreignKey: 'module_leader' });

interface Module
  extends Model<InferAttributes<Module>, InferCreationAttributes<Module>> {
  module_id?: CreationOptional<string>;
  module_name: string;
  module_leader: string;
}
