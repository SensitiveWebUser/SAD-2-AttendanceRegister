import { Tutor, tutorConstructorParams } from './Tutor';

export class CourseLeader extends Tutor {
  private _courseId: string;

  constructor({
    user_id,
    first_name,
    middle_name,
    last_name,
    email,
    user_type_id,
    course_id,
  }: constructorParams) {
    super({ user_id, first_name, middle_name, last_name, email, user_type_id });
    this._courseId = course_id;
  }

  public getCourseId() {
    return this._courseId;
  }

  public updateAttendance() {}
}

interface constructorParams extends tutorConstructorParams {
  course_id: string;
}
