import { Student, User, Tutor, UserToJsonReturn } from '../models';

import {
  AdvisorStudentLink as AdvisorStudentLinkSchema,
  User as UserSchema,
} from '../database';

export class AcademicAdvisor extends Tutor {
  constructor({ userObject }: constructorParams) {
    super({ userObject });
  }

  async getAdvisees(): Promise<Student[]> {
    const adviseeRecords = await AdvisorStudentLinkSchema.findAll({
      where: {
        advisor_id: this.getId,
      },
    });

    const advisees = adviseeRecords.map(
      async (adviseeRecord: { dataValues: { student_id: string } }) => {
        const userRecords = await UserSchema.findOne({
          where: {
            user_id: adviseeRecord.dataValues.student_id,
          },
        });

        return new Student({
          userObject: new User({
            id: userRecords!.dataValues.user_id,
            type: userRecords!.dataValues.user_type_id,
            firstName: userRecords!.dataValues.first_name,
            middleName: userRecords!.dataValues.middle_name,
            lastName: userRecords!.dataValues.last_name,
            email: userRecords!.dataValues.email,
          }),
          academicAdvisorId: this.getId,
        });
      }
    );

    return Promise.all(advisees);
  }

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      ...(await super.toJsonAsync()),
      advisees: await Promise.all(
        (await this.getAdvisees()).map((advisee) => advisee.toJsonAsync())
      ),
    };
  }
}

interface toJsonReturn extends UserToJsonReturn {
  advisees: object[];
}

interface constructorParams {
  userObject: User;
}
