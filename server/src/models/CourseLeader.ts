import { Tutor } from './Tutor';

export class CourseLeader extends Tutor {
  private _courseId: string;

  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    sessionList: object,
    courseId: string
  ) {
    super(id, type, firstName, middleName, lastName, email, sessionList);
    this._courseId = courseId;
  }

  public getCourseId() {
    return this._courseId;
  }

  public updateAttendance() {}
}
