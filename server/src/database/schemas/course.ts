import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';

export const Course = sequelize.define<Course>('course', {
  course_id: {
    type: DataTypes.STRING(36),
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
});

// Add foreign keys
Course.belongsTo(User, { foreignKey: 'course_leader_id' });

interface Course extends Model {
  course_id?: CreationOptional<string>;
  course_name: string;
  course_leader_id: string;
}
