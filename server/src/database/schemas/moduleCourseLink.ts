import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

import { Module } from './module';
import { Course } from './course';

export const ModuleCourseLink = sequelize.define<ModuleCourseLink>(
  'module_course_link',
  {
    module_course_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    module_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

// Add foreign keys
ModuleCourseLink.belongsTo(Module, { foreignKey: 'module_id' });
ModuleCourseLink.belongsTo(Course, { foreignKey: 'course_id' });

interface ModuleCourseLink
  extends Model<
    InferAttributes<ModuleCourseLink>,
    InferCreationAttributes<ModuleCourseLink>
  > {
  module_course_id?: CreationOptional<string>;
  module_id: string;
  course_id: string;
}
