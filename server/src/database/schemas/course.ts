import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';

export const Course = sequelize.define<Course>('course', {
  course_id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_leader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Add foreign keys
Course.belongsTo(User, { foreignKey: 'course_leader' });

interface Course
  extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
  course_id?: CreationOptional<string>;
  course_name: string;
  course_leader: string;
}