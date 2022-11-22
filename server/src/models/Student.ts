import { User } from '.';

export class Student extends User {
  private _attendanceData: object;
  private _advisor: string;

  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    advisor: string,
    attendanceData: object
  ) {
    super(id, type, firstName, middleName, lastName, email);
    this._advisor = advisor;
    this._attendanceData = attendanceData;
  }

  protected getAttendanceData() {
    return this._attendanceData;
  }

  protected getAdvisor() {
    return this._advisor;
  }

  protected registerAttendance() {}
}
