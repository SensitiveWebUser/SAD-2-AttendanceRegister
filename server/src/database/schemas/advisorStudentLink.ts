import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { User } from './user';

export const AdvisorStudentLink = sequelize.define<AdvisorStudentLink>(
  'advisor_student_link',
  {
    advisor_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
  },
  { underscored: true, freezeTableName: true, timestamps: false }
);

AdvisorStudentLink.belongsTo(User, { foreignKey: 'advisor_id' });
AdvisorStudentLink.belongsTo(User, { foreignKey: 'student_id' });

interface AdvisorStudentLink extends Model {
  advisor_id: string;
  student_id: string;
}
