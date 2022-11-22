import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';

export const Course = sequelize.define<Course>('course', {
  course_id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  course_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  course_leader: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Add foreign keys
Course.belongsTo(User, { foreignKey: 'course_leader' });

interface Course extends Model {
  course_id?: CreationOptional<number>;
  course_name: string;
  course_leader: number;
}
