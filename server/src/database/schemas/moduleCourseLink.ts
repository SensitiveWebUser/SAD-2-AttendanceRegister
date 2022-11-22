import { Model, DataTypes } from 'sequelize';

import { sequelize } from '@Database';

import { Module } from './module';
import { Course } from './course';

export const ModuleCourseLink = sequelize.define<ModuleCourseLink>(
  'module_course_link',
  {
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }
);

// Add foreign keys
ModuleCourseLink.belongsTo(Module, { foreignKey: 'module_id' });
ModuleCourseLink.belongsTo(Course, { foreignKey: 'course_id' });

interface ModuleCourseLink extends Model {
  module_id: number;
  course_id: number;
}
