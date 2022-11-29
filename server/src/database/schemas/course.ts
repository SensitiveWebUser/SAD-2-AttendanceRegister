import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { User } from './user';

export const Course = sequelize.define<Course>(
  'course',
  {
    course_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    course_leader_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
  },
  { underscored: true, freezeTableName: true, timestamps: false }
);

Course.belongsTo(User, { foreignKey: 'course_leader_id' });

interface Course extends Model {
  course_id?: CreationOptional<string>;
  course_name: string;
  course_leader_id: string;
}
