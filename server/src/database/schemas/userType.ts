import { CreationOptional, DataTypes, Model } from 'sequelize';
import { userTypeEnum } from '../../utils/userTypeEnum';
import { sequelize } from '../database';

export const UserType = sequelize.define<UserType>(
  'user_type',
  {
    user_type_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_type_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false, freezeTableName: true }
);

interface UserType extends Model {
  user_type_id?: CreationOptional<string>;
  user_type_name:
    | userTypeEnum.ADMIN
    | userTypeEnum.STUDENT
    | userTypeEnum.TUTOR
    | userTypeEnum.MODULE_LEADER
    | userTypeEnum.COURSE_LEADER
    | userTypeEnum.ACADEMIC_ADVISOR;
}
