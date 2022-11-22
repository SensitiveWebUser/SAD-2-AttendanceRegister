import { Tutor } from './Tutor';

export class CourseLeader extends Tutor {
  private _course: number;

  constructor(
    id: number,
    type: number,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    sessionList: object,
    course: number
  ) {
    super(id, type, firstName, middleName, lastName, email, sessionList);
    this._course = course;
  }

  public getCourse() {
    return this._course;
  }

  public updateAttendance() {}
}
