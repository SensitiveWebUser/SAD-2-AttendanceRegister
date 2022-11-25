import { Attendance as AttendanceSchema } from '@Database';

export class Attendance {
  private _attendanceId: string;
  private _studentId: string;
  private attended: Date;

  constructor({ attendanceId, studentId, attended }: constructorParams) {
    this._attendanceId = attendanceId;
    this._studentId = studentId;
    this.attended = new Date(attended);
  }

  public getAttendanceId(): string {
    return this._attendanceId;
  }

  public getStudentId(): string {
    return this._studentId;
  }

  public getAttendedDate(): Date {
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
  attendanceId: string;
  studentId: string;
  attended: number;
}
