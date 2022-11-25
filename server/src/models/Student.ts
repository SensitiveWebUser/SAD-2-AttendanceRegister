import { Session, AcademicAdvisor, Course, Attendance } from '@Models';
import { User, userConstructorParams } from './User';

import {
  Attendance as AttendanceSchema,
  Session as SessionSchema,
  User as UserSchema,
  Course as CourseSchema,
} from '@Database';

export class Student extends User {
  private _courseId: string;

  constructor({
    user_id,
    first_name,
    middle_name,
    last_name,
    email,
    user_type_id,
    course_id,
  }: constructorParams) {
    super({ user_id, first_name, middle_name, last_name, email, user_type_id });
    this._courseId = course_id;
  }

  // generates a report object of the users attendance for a given module or all modules
  public getAttendanceData = async (moduleId?: string): Promise<Report> => {
    // empty report object to be returned at the end
    var report: Report = { data: [] };

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

        // Set default values for the session to the session id
        var session: Session | string = this.getId();

        // If the session exists, create a session object
        if (sessionData) session = new Session(sessionData.dataValues);

        // If the module id is specified and the session is a session object
        // check if module id matches the module id of the session
        // if it does skip the rest of the loop
        if (
          moduleId &&
          typeof session !== 'string' &&
          session.getModuleId() === moduleId
        )
          continue;

        // Add the session and timestamp to the report object
        report.data.push({
          session,
          timestamp,
        });
      }
    }

    //return the report object
    return report;
  };

  // gets the users course as a Course object
  public getCourse = async () => {
    const course = await CourseSchema.findByPk(this._courseId);

    if (!course) return null;

    return new Course(course.dataValues);
  };

  // try to register the users attendance for a session by checking
  // if the user is registered for the session and if the session has not already ended
  // returns true if the user was registered and false if they were not
  public registerAttendance = async (
    sessionId: string,
    code: string
  ): Promise<boolean> => {
    // get the attendanceRecord from the database
    const attendanceRecord = await AttendanceSchema.findOne({
      where: {
        user_id: this.getId(),
        session_id: sessionId,
      },
    });

    // get the session from the database
    const sessionRecord = await SessionSchema.findByPk(sessionId);

    // check if the session and attendanceRecord exists
    //? Might want to make this an error
    if (!attendanceRecord || !sessionRecord) return false;

    // uses database records to create Attendance and Session objects
    const session = new Session(sessionRecord.dataValues);
    const attendance = new Attendance(attendanceRecord.dataValues);

    // makes date objects for the current time
    const timestamp = new Date();

    // checks if code is correct, student already registered and if the session has not ended/started
    if (
      session.getSessionCode() === code ||
      !attendance.hasAttended() ||
      (session.getStartTime() > timestamp && session.getEndTime() < timestamp)
    ) {
      // try to update the attendance record in the database
      try {
        attendance.setAttendedDate(timestamp);
        await attendance.updateDatabase();
      } catch {
        return false;
      }

      //? Might want to make this an error
      return true;
    }

    return false;
  };
}

interface constructorParams extends userConstructorParams {
  course_id: string;
}

interface Report {
  data: Array<{ session: Session | string; timestamp: Date }>;
}
