import { Tutor, tutorConstructorParams } from '@Models';

export class CourseLeader extends Tutor {
  private _courseId: string;

  constructor({
    userId,
    firstName,
    middleName,
    lastName,
    email,
    userTypeId,
    courseId,
  }: constructorParams) {
    super({ userId, firstName, middleName, lastName, email, userTypeId });
    this._courseId = courseId;
  }

  public getCourseId() {
    return this._courseId;
  }
}

interface constructorParams extends tutorConstructorParams {
  courseId: string;
}
