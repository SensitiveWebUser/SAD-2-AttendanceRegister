import { User } from './User';

export class Student extends User {
  private _attendanceData: object;
  private _advisorId: string;

  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    advisorId: string,
    attendanceData: object
  ) {
    super(id, type, firstName, middleName, lastName, email);
    this._advisorId = advisorId;
    this._attendanceData = attendanceData;
  }

  public getAttendanceData() {
    return this._attendanceData;
  }

  public getAdvisor() {
    return this._advisorId;
  }

  public registerAttendance() {}
}
