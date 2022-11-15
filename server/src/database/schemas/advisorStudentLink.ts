import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelize } from '@Database';

import { User } from './user';

export const AdvisorStudentLink = sequelize.define<AdvisorStudentLink>(
  'advisor_student_link',
  {
    advisor_student_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    advisor_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

//Add foreign keys
AdvisorStudentLink.belongsTo(User, { foreignKey: 'advisor_id' });
AdvisorStudentLink.belongsTo(User, { foreignKey: 'student_id' });

interface AdvisorStudentLink
  extends Model<
    InferAttributes<AdvisorStudentLink>,
    InferCreationAttributes<AdvisorStudentLink>
  > {
  advisor_student_id?: CreationOptional<string>;
  advisor_id: string;
  student_id: string;
}
