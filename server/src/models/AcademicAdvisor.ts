import { Student, Tutor, tutorConstructorParams } from '@Models';
import { AdvisorStudentLink as AdvisorStudentLinkSchema } from '@Database';

export class AcademicAdvisor extends Tutor {
  constructor({
    userId,
    firstName,
    middleName,
    lastName,
    email,
    userTypeId,
  }: constructorParams) {
    super({ userId, firstName, middleName, lastName, email, userTypeId });
  }

  public getAdviseeList = async () => {
    const adviseeList = await AdvisorStudentLinkSchema.findAll({
      where: {
        advisor_id: this.getId(),
      },
    });

    return adviseeList.map((advisee) => new Student(advisee.dataValues));
  };
}

interface constructorParams extends tutorConstructorParams {}
