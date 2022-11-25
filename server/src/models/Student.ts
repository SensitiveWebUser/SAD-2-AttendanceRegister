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

export class Student extends User {
  private _courseId: string;

  constructor({
    userId,
    firstName,
    middleName,
    lastName,
    email,
    userTypeId,
    courseId,
  }: constructorParams) {
    super({ userId, firstName, middleName, lastName, email, userTypeId });
    this._courseId = courseId;
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
        //TODO: better mapping of data
        if (sessionData)
          session = new Session({
            sessionId: sessionData.dataValues.session_id,
            sessionTypeId: sessionData.dataValues.session_type_id,
            tutorId: sessionData.dataValues.tutor_id,
            moduleId: sessionData.dataValues.module_id,
            startTimestamp: sessionData.dataValues.start_timestamp,
            endTimestamp: sessionData.dataValues.end_timestamp,
            code: sessionData.dataValues.code,
          });

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

    //Return the report object
    return report;
  };

  // Gets the users course as a Course object
  public getCourse = async () => {
    const course = await CourseSchema.findByPk(this._courseId);

    if (!course) return null;

    return new Course({
      courseId: course.dataValues.course_id,
      courseName: course.dataValues.course_name,
      courseLeaderId: course.dataValues.course_leader_id,
    });
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
    //? Might want to make this an error
    if (!attendanceRecord || !sessionRecord) return false;

    // Uses database records to create Attendance and Session objects
    const session = new Session(sessionRecord.dataValues);
    const attendance = new Attendance(attendanceRecord.dataValues);

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
  courseId: string;
}

interface Report {
  data: Array<{ session: Session | string; timestamp: Date }>;
}
