import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

// NEEDS TO BE IMPORTED SEPARATELY
import { User } from './user';

export const Module = sequelize.define<Module>('module', {
  module_id: {
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  module_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  module_leader_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
});

// Add foreign keys
Module.belongsTo(User, { foreignKey: 'module_leader_id' });

interface Module extends Model {
  module_id?: CreationOptional<string>;
  module_name: string;
  module_leader_id: string;
}
