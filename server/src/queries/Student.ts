import { User } from '.';

export class Student extends User {
  private _attendanceData: object;
  private _advisor: string;

  constructor() {
    super();
    this._attendanceData = {};
    this._advisor = '';
  }

  protected getAttendanceData() {
    return this._attendanceData;
  }

  protected getAdvisor() {
    return this._advisor;
  }

  protected registerAttendance() {}
}
