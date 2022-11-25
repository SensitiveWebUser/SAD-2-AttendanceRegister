import { Module } from './../database/schemas/module';

import { Attendance as AttendanceSchema } from '@Database';

export class Attendance {
  private _attendanceId: string;
  private _studentId: string;
  private attended: Date;

  constructor({ attendance_id, student_id, attended }: constructorParams) {
    this._attendanceId = attendance_id;
    this._studentId = student_id;
    this.attended = new Date(attended);
  }

  public getAttendanceId() {
    return this._attendanceId;
  }

  public getStudentId() {
    return this._studentId;
  }

  public getAttendedDate() {
    return this.attended;
  }

  public setAttendedDate(attended: Date) {
    this.attended = attended;
  }

  public hasAttended = (): boolean => {
    if (this.attended.getTime() !== 0) return true;

    return false;
  };

  public updateDatabase = async (): Promise<boolean> => {
    try {
      await AttendanceSchema.update(
        {
          attended: this.attended.getTime(),
        },
        {
          where: {
            user_id: this._studentId,
            attendance_id: this._attendanceId,
          },
        }
      );

      return true;
    } catch {}

    return false;
  };
}

interface constructorParams {
  attendance_id: string;
  student_id: string;
  attended: number;
}
