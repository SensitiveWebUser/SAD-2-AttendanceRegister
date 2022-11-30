import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Course } from './course';
import { Module } from './module';

export const ModuleCourseLink = sequelize.define<ModuleCourseLink>(
  'module_course_link',
  {
    module_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.UUID,
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
