import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

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

interface Module
  extends Model<InferAttributes<Module>, InferCreationAttributes<Module>> {
  module_id?: CreationOptional<string>;
  module_name: string;
  module_leader: string;
}
