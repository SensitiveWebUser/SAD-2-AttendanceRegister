import { Session, Student } from '../models';
import { Attendance as AttendanceSchema } from '../database';

export class Attendance {
  private student: Student;
  private session: Session;
  private attended: Date | undefined;

  constructor({ student, session, attended }: constructorParams) {
    this.student = student;
    this.session = session;
    if (attended) this.attended = attended;
  }

  public get getStudent(): Student {
    return this.student;
  }

  public get getSession(): Session {
    return this.session;
  }

  public get getAttended(): Date | undefined {
    return this.attended;
  }

  public setAttendance(attended: Date) {
    this.attended = attended;
  }

  public hasAttendedAsync = async (): Promise<boolean> => {
    return this.attended !== undefined;
  };

  public updateDatabaseAsync = async (): Promise<void> => {
    await AttendanceSchema.update(
      {
        attended: this.attended,
      },
      {
        where: {
          user_id: this.student.getId,
          session_id: this.session.getId,
        },
      }
    );
  };

  toJsonWithAttendance(): {
    student: string;
    session: string;
    attended: Date | null;
    } {
    return {
      student: this.student.getId,
      session: this.session.getId,
      attended: this.attended ? this.attended : null,
    };
  }

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      student: await this.student.toJsonAsync(),
      session: await this.session.toJsonAsync(),
      attended: this.attended ? this.attended : null,
    };
  }
}

interface toJsonReturn {
  student: object;
  session: object;
  attended: Date | null;
}

interface constructorParams {
  student: Student;
  session: Session;
  attended: Date | null;
}
