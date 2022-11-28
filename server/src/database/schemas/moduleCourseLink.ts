import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@Database';
import { Module } from './module';
import { Course } from './course';

export const ModuleCourseLink = sequelize.define<ModuleCourseLink>(
  'module_course_link',
  {
    module_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  { underscored: true, freezeTableName: true, timestamps: false }
);

ModuleCourseLink.belongsTo(Module, { foreignKey: 'module_id' });
ModuleCourseLink.belongsTo(Course, { foreignKey: 'course_id' });

interface ModuleCourseLink extends Model {
  module_id: string;
  course_id: string;
}
