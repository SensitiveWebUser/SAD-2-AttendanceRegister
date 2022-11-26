import {
  Session,
  Course,
  Attendance,
  User,
  userConstructorParams,
} from '@Models';

import {
  Attendance as AttendanceSchema,
  Session as SessionSchema,
  Course as CourseSchema,
} from '@Database';

import { mapAttendance, mapSession } from '@Utils/dataMapper';

export class Student extends User {
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

  // generates a report object of the users attendance for a given module or all modules
  public getAttendanceData = async (
    moduleId?: string
  ): Promise<studentAttendanceReport> => {
    // empty report object to be returned at the end
    const report: studentAttendanceReport = {
      data: [],
      amountOfStudentSessions: 0,
    };

    // get all sessions for the user from the attendance table
    const data = await AttendanceSchema.findAll({
      where: {
        user_id: this.getId(),
      },
    });

    // If the user has no attendance records skip the rest of the function
    if (data) {
      // Fill the report object with the attendance data
      // use "for" loop to avoid early return from forEach
      for (const row of data) {
        const sessionId = row.session_id;
        const timestamp = new Date(row.attended as number);

        const sessionData = await SessionSchema.findByPk(sessionId);

        // If the session exists, create a session object
        if (!sessionData) continue;

        const session = new Session(mapSession(sessionData.dataValues));

        // If the module id is specified and the session is a session object
        // check if module id matches the module id of the session
        // if it does skip the rest of the loop
        if (moduleId && session.getModuleId() === moduleId) {
          continue;
        }

        // Add the session and timestamp to the report object
        report.data.push({
          session,
          timestamp,
        });
        report.amountOfStudentSessions++;
      }
    }

    //Return the report object
    return report;
  };

  // Try to register the users attendance for a session by checking
  // if the user is registered for the session and if the session has not already ended
  // returns true if the user was registered and false if they were not
  public registerAttendance = async (
    sessionId: string,
    code: string
  ): Promise<boolean> => {
    // Get the attendanceRecord from the database
    const attendanceRecord = await AttendanceSchema.findOne({
      where: {
        user_id: this.getId(),
        session_id: sessionId,
      },
    });

    // Get the session from the database
    const sessionRecord = await SessionSchema.findByPk(sessionId);

    // Check if the session and attendanceRecord exists
    if (!attendanceRecord || !sessionRecord) return false;

    // Uses database records to create Attendance and Session objects
    const session = new Session(mapSession(sessionRecord.dataValues));
    const attendance = new Attendance(
      mapAttendance(attendanceRecord.dataValues)
    );

    // Makes date objects for the current time
    const timestamp = new Date();

    // Checks if code is correct, student already registered and if the session has not ended/started
    if (
      session.getSessionCode() === code ||
      !attendance.hasAttended() ||
      (session.getStartTime() > timestamp && session.getEndTime() < timestamp)
    ) {
      // Try to update the attendance record in the database
      try {
        attendance.setTimestampDate(timestamp);
        await attendance.updateDatabase();
      } catch {
        return false;
      }

      return true;
    }

    return false;
  };
}

interface studentAttendanceReport {
  data: Array<{
    session: Session;
    timestamp: Date;
  }>;
  amountOfStudentSessions: number;
}

interface constructorParams extends userConstructorParams {}
