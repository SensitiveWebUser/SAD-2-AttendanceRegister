import { Tutor } from '.';

export class CourseLeader extends Tutor {
  private _course: string;

  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    sessionList: object,
    course: string
  ) {
    super(id, type, firstName, middleName, lastName, email, sessionList);
    this._course = course;
  }

  protected getCourse() {
    return this._course;
  }

  protected updateAttendance() {}
}
