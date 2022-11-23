import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '@Database';

export const UserType = sequelize.define<UserType>('user_type', {
  user_type_id: {
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  user_type_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

interface UserType extends Model {
  user_type_id?: CreationOptional<string>;
  user_type_name:
    | 'Admin'
    | 'Student'
    | 'Tutor'
    | 'ModuleLeader'
    | 'CourseLeader'
    | 'AcademicAdvisor';
}
