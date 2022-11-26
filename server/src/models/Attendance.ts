import { Attendance as AttendanceSchema } from '@Database';

export class Attendance {
  private _sessionId: string;
  private _studentId: string;
  private _timestamp: Date;

  constructor({ sessionId, studentId, timestamp }: constructorParams) {
    this._sessionId = sessionId;
    this._studentId = studentId;
    this._timestamp = new Date(timestamp);
  }

  public getSessionId(): string {
    return this._sessionId;
  }

  public getStudentId(): string {
    return this._studentId;
  }

  public getTimestampDate(): Date {
    return this._timestamp;
  }

  public setTimestampDate(timestamp: Date) {
    this._timestamp = timestamp;
  }

  public hasAttended = (): boolean => {
    if (this._timestamp.getTime() !== 0) return true;

    return false;
  };

  public updateDatabase = async (): Promise<boolean> => {
    try {
      await AttendanceSchema.update(
        {
          attended: this._timestamp.getTime(),
        },
        {
          where: {
            user_id: this._studentId,
            session_id: this._sessionId,
          },
        }
      );

      return true;
    } catch {}

    return false;
  };
}

interface constructorParams {
  sessionId: string;
  studentId: string;
  timestamp: number;
}
