import { debug } from 'debug';

import {
  User,
  UserToJsonReturn,
  AcademicAdvisor,
  Attendance,
  Session,
} from '../models';
import {
  Attendance as AttendanceSchema,
  Session as SessionSchema,
  User as UserSchema,
} from '../database';

const logger = debug('backend:Student');

export class Student extends User {
  private academicAdvisorId: string;

  constructor({ userObject, academicAdvisorId }: constructorParams) {
    super(userObject);
    this.academicAdvisorId = academicAdvisorId;
  }

  // getters

  public getAcademicAdvisorId = (): string => this.academicAdvisorId;

  // setters

  // methods

  public getAttendances = async (moduleId?: string): Promise<Attendance[]> => {
    const attendanceRecords = await AttendanceSchema.findAll({
      where: {
        user_id: this.getId,
      },
    });

    if (!attendanceRecords) {
      logger('No attendances found for student in attendance table');
      return [];
    }

    const attendanceArray = attendanceRecords.map(
      async (attendanceRecord: {
        dataValues: { session_id: string; attended: Date | null };
      }) => {
        const sessionRecord = await SessionSchema.findByPk(
          attendanceRecord.dataValues.session_id
        );

        const session = new Session({
          id: sessionRecord!.dataValues.user_id,
          type: sessionRecord!.dataValues.session_type_id,
          moduleId: sessionRecord!.dataValues.module_id,
          startTimestamp: sessionRecord!.dataValues.start_timestamp,
          endTimestamp: sessionRecord!.dataValues.end_timestamp,
          code: sessionRecord!.dataValues.code,
        });

        return new Attendance({
          student: this,
          session,
          attended: attendanceRecord.dataValues.attended,
        });
      }
    );

    //if moduleId is provided, filter the attendances by moduleId
    if (moduleId) {
      const filteredAttendanceArray = attendanceArray.filter(
        async (attendance) => {
          const session = (await attendance).getSession;
          return session.getModuleId() === moduleId;
        }
      );

      return Promise.all(filteredAttendanceArray);
    }

    return Promise.all(attendanceArray);
  };

  public getAcademicAdvisor = async (): Promise<AcademicAdvisor | null> => {
    const advisorRecord = await UserSchema.findOne({
      where: {
        user_id: this.academicAdvisorId,
      },
    });

    logger('advisorRecord', advisorRecord);

    if (!advisorRecord) {
      logger(
        'No academic advisor found for student in advisor_student_link table'
      );
      return null;
    }

    return new AcademicAdvisor({
      userObject: new User({
        id: advisorRecord!.dataValues.user_id,
        type: advisorRecord!.dataValues.user_type_id,
        firstName: advisorRecord!.dataValues.first_name,
        middleName: advisorRecord!.dataValues.middle_name,
        lastName: advisorRecord!.dataValues.last_name,
        email: advisorRecord!.dataValues.email,
      }),
    });
  };

  public registerAttendanceAsync = async (
    session: Session,
    code: string
  ): Promise<boolean> => {
    console.log('registerAttendanceAsync()');

    // Get the attendanceRecord from the database
    const attendanceRecord = await AttendanceSchema.findOne({
      where: {
        user_id: this.getId,
        session_id: session.getId,
      },
    });

    console.log('attendanceRecord', attendanceRecord);

    const attendance = new Attendance({
      student: this,
      session,
      attended: attendanceRecord!.dataValues.attended || null,
    });

    // Makes date objects for the current time
    const timestamp: Date = new Date();

    const hasAttended: boolean = await attendance.hasAttendedAsync();
    console.log('hasAttended', hasAttended);

    // Checks if code is correct, student already registered and if the session has not ended/started
    if (
      session.getCode() === code &&
      !hasAttended &&
      session.getStartTimestamp() > timestamp &&
      session.getEndTimestamp() < timestamp
    ) {
      // Try to update the attendance record in the database
      try {
        console.log('Updating attendance record');

        attendance.setAttendance(timestamp);
        await attendance.updateDatabaseAsync();
      } catch {
        return false;
      }

      return true;
    }

    return false;
  };

  async toJsonAsync(): Promise<toJsonReturn> {
    logger('toJsonAsync()');
    return {
      ...(await super.toJsonAsync()),
      academicAdvisorId: this.academicAdvisorId,
    };
  }
}

interface toJsonReturn extends UserToJsonReturn {
  academicAdvisorId: string;
}

interface constructorParams {
  userObject: User;
  academicAdvisorId: string;
}
