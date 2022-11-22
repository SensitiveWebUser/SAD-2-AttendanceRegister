import { User } from './User';

export class Student extends User {
  private _attendanceData: object;
  private _advisor: number;

  constructor(
    id: number,
    type: number,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    advisor: number,
    attendanceData: object
  ) {
    super(id, type, firstName, middleName, lastName, email);
    this._advisor = advisor;
    this._attendanceData = attendanceData;
  }

  public getAttendanceData() {
    return this._attendanceData;
  }

  public getAdvisor() {
    return this._advisor;
  }

  public registerAttendance() {}
}
