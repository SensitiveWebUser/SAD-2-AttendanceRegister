import { debug } from 'debug';
import { BadRequestError } from 'src/errors';
import {
  Attendance as AttendanceSchema,
  Session as SessionSchema,
  User as UserSchema,
} from '../database';
import {
  AcademicAdvisor,
  Attendance,
  Session,
  User,
  UserToJsonReturn,
  Course,
} from '../models';

const logger = debug('backend:Student');

export class Student extends User {
  private academicAdvisorId: string;

  constructor({ userObject, academicAdvisorId }: constructorParams) {
    super(userObject);
    this.academicAdvisorId = academicAdvisorId;
  }

  public getAcademicAdvisorId = (): string => this.academicAdvisorId;

  public getAttendancesAsync = async (
    moduleId?: string
  ): Promise<Attendance[]> => {
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
          id: sessionRecord?.dataValues.user_id,
          type: sessionRecord?.dataValues.session_type_id,
          moduleId: sessionRecord?.dataValues.module_id,
          startTimestamp: sessionRecord?.dataValues.start_timestamp,
          endTimestamp: sessionRecord?.dataValues.end_timestamp,
          code: sessionRecord?.dataValues.code,
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
          return session.getModuleId === moduleId;
        }
      );

      return Promise.all(filteredAttendanceArray);
    }

    return Promise.all(attendanceArray);
  };

  public getAcademicAdvisorAsync =
    async (): Promise<AcademicAdvisor | null> => {
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
          id: advisorRecord?.dataValues.user_id,
          type: advisorRecord?.dataValues.user_type_id,
          firstName: advisorRecord?.dataValues.first_name,
          middleName: advisorRecord?.dataValues.middle_name,
          lastName: advisorRecord?.dataValues.last_name,
          email: advisorRecord?.dataValues.email,
        }),
      });
    };

  public registerAttendanceAsync = async (
    session: Session,
    code: string
  ): Promise<boolean> => {
    // Get the attendanceRecord from the database
    const attendanceRecord = await AttendanceSchema.findOne({
      where: {
        user_id: this.getId,
        session_id: session.getId,
      },
    });

    const attendance = new Attendance({
      student: this,
      session,
      attended: attendanceRecord?.dataValues.attended || null,
    });

    // Makes date objects for the current time
    const timestamp: Date = new Date();

    const hasAttended: boolean = await attendance.hasAttendedAsync();

    if (session.getCode !== code) throw new BadRequestError('Invalid code');
    if (hasAttended) throw new BadRequestError('Already register attendance');
    if (
      session.getStartTimestamp.getTime() > timestamp.getTime() ||
      session.getEndTimestamp.getTime() < timestamp.getTime()
    ) {
      throw new BadRequestError('Session is not active');
    }

    try {
      attendance.setAttendance(timestamp);
      await attendance.updateDatabaseAsync();
    } catch {
      return false;
    }

    return true;
  };

  async toJsonAsync(): Promise<toJsonReturn> {
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
