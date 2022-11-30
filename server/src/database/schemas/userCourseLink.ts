import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Course } from './course';
import { User } from './user';

export const UserCourseLink = sequelize.define<UserCourseLink>(
  'user_course_link',
  {
    user_id: {
      type: DataTypes.STRING(36),
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

UserCourseLink.belongsTo(User, { foreignKey: 'user_id' });
UserCourseLink.belongsTo(Course, { foreignKey: 'course_id' });

interface UserCourseLink extends Model {
  user_id: string;
  course_id: string;
}
