import {
  Session,
  User,
  userConstructorParams,
  Student,
  Attendance,
} from '@Models';

import {
  Attendance as AttendanceSchema,
  Session as SessionSchema,
  User as UserSchema,
} from '@Database';

import { mapUser, mapSession } from '@Utils/dataMapper';
export class Tutor extends User {
  constructor({
    userId,
    firstName,
    middleName,
    lastName,
    email,
    userTypeId,
  }: constructorParams) {
    super({ userId, firstName, middleName, lastName, email, userTypeId });
  }

  public getSessionIds = async (tutorId?: string): Promise<Array<String>> => {
    const sessions = await SessionSchema.findAll({
      where: {
        tutor_id: tutorId || this.getId(),
      },
    });

    const sessionIds: Array<String> = [];

    for (const session of sessions) {
      sessionIds.push(session.dataValues.session_id);
    }

    return sessionIds;
  };

  //TODO
  public getStudentsAttendance = async (
    tutorId?: string,
    moduleId?: string
  ): Promise<studentsAttendanceReport | null> => {
    const report: studentsAttendanceReport = { data: [], amountOfStudents: 0 };

    const sessionIds = await this.getSessionIds(tutorId);

    if (sessionIds.length === 0) return null;

    const data = await AttendanceSchema.findAll({
      where: {
        session_id: sessionIds,
      },
    });

    if (data) {
      for (const row of data) {
        const studentId: string = row.dataValues.user_id;
        const timestamp: number = row.dataValues.attended as number;

        //get the session object from the attendance record
        const sessionData = await SessionSchema.findByPk(
          row.dataValues.session_id
        );

        //get the student object from the database
        const studentData = await UserSchema.findByPk(studentId);

        //check if the student and sesssion exists
        if (!studentData || !sessionData) continue;

        //create student and session objects
        const student = new Student(mapUser(studentData.dataValues));
        const session = new Session(mapSession(sessionData.dataValues));

        //check if the module id is specified and if the session is a session object
        if (moduleId && session.getModuleId() === moduleId) {
          continue;
        }

        //check if the student is already in the report
        const studentIndex = report.data.findIndex((dataRow) => {
          const student: Student = dataRow.student;
          return student.getId() === studentId;
        });

        //if the student is not in the report, add them
        if (studentIndex === -1) {
          report.data.push({
            student,
            sessionsAttended: [
              {
                data: [
                  {
                    session,
                    timestamp: new Date(timestamp),
                  },
                ],
                amountOfStudentSessions: 1,
              },
            ],
          });
          report.amountOfStudents++;
        } else {
          //if the student is in the report, add the session is in the student's attendance
          report.data[studentIndex].sessionsAttended.push({
            data: [
              {
                session,
                timestamp: new Date(timestamp),
              },
            ],
            amountOfStudentSessions: 1,
          });
        }
      }
    }
    return report;
  };

  public getStudentAttendance = async (
    studentId: string,
    moduleId?: string
  ): Promise<studentAttendanceReport | null> => {
    const studentRecord = await UserSchema.findByPk(studentId);

    if (!studentRecord) return null;
    const student: Student = new Student(studentRecord.dataValues);

    const report = await student.getAttendanceData(moduleId);

    if (!report) return { data: [], amountOfStudentSessions: 0 };

    return report;
  };

  //TODO
  public updateStudentAttendance = async (
    studentId: string,
    sessionId: string,
    timestamp: Date
  ): Promise<boolean> => {
    const attendanceRecord = await AttendanceSchema.findOne({
      where: {
        user_id: studentId,
        session_id: sessionId,
      },
    });

    // Get the session from the database
    const sessionRecord = await SessionSchema.findByPk(sessionId);

    // Check if the session and attendanceRecord exists
    if (!attendanceRecord || !sessionRecord) return false;

    // Uses database records to create Attendance and Session objects
    const session = new Session(sessionRecord.dataValues);
    const attendance = new Attendance(attendanceRecord.dataValues);

    if (session.getEndTime() >= timestamp) {
      try {
        attendance.setTimestampDate(timestamp);
        attendance.updateDatabase();
      } catch {
        return false;
      }

      return true;
    }

    return false;
  };
}
interface studentsAttendanceReport {
  data: Array<{
    student: Student;
    sessionsAttended: Array<studentAttendanceReport>;
  }>;
  amountOfStudents: number;
}
interface studentAttendanceReport {
  data: Array<{
    session: Session;
    timestamp: Date;
  }>;
  amountOfStudentSessions: number;
}

interface constructorParams extends userConstructorParams {}
export { constructorParams as tutorConstructorParams };
