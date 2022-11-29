import {
  Attendance as AttendanceSchema,
  Module as ModuleSchema,
  Session as SessionSchema,
  SessionType as SessionTypeSchema,
  User as UserSchema,
} from '../database';
import { Attendance, Module, SessionType, Student, User } from '../models';

export class Session {
  private id: string;
  private type: string;
  private moduleId: string;
  private startTimestamp: Date;
  private endTimestamp: Date;
  private code: string;

  constructor({
    id,
    type,
    moduleId,
    startTimestamp,
    endTimestamp,
    code,
  }: constructorParams) {
    this.id = id;
    this.type = type;
    this.moduleId = moduleId;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.code = code;
  }

  public get getId(): string {
    return this.id;
  }

  public getTypeAsync = async (): Promise<SessionType> => {
    const sessionTypeRecord = await SessionTypeSchema.findByPk(this.type);

    const type = new SessionType({
      id: sessionTypeRecord!.dataValues.session_type_id,
      name: sessionTypeRecord!.dataValues.session_type_name,
    });

    return type;
  };

  public getAttendancesAsync = async (): Promise<{
    attendances: Attendance[];
    total: number;
  }> => {
    let total = 0;

    const attendances = await AttendanceSchema.findAll({
      where: {
        session_id: this.id,
      },
    });

    if (!attendances) return { attendances: [], total };

    const attendancesArray = attendances.map(async (attendance: any) => {
      const studentRecord = await UserSchema.findByPk(
        attendance.dataValues.user_id
      );

      const student = new Student({
        userObject: new User({
          id: studentRecord!.dataValues.user_id,
          type: studentRecord!.dataValues.user_type_id,
          firstName: studentRecord!.dataValues.first_name,
          middleName: studentRecord!.dataValues.middle_name,
          lastName: studentRecord!.dataValues.last_name,
          email: studentRecord!.dataValues.email,
        }),
        academicAdvisorId: studentRecord!.dataValues.academic_advisor_id,
      });

      total++;

      return new Attendance({
        student,
        session: this,
        attended: attendance.dataValues.attended,
      });
    });

    return {
      attendances: await Promise.all(attendancesArray),
      total: total,
    };
  };

  public get getModuleId(): string {
    return this.moduleId;
  }

  public get getStartTimestamp(): Date {
    return this.startTimestamp;
  }

  public get getEndTimestamp(): Date {
    return this.endTimestamp;
  }

  public get getCode(): string {
    return this.code;
  }

  // setters

  public setId = (id: string): void => {
    this.id = id;
  };

  public setStartTimestamp = (startTimestamp: Date): void => {
    this.startTimestamp = startTimestamp;
  };

  public setEndTimestamp = (endTimestamp: Date): void => {
    this.endTimestamp = endTimestamp;
  };

  // methods

  public updateDatabaseAsync = async (): Promise<boolean> => {
    const session = await SessionSchema.findByPk(this.getId);

    if (!session) return false;

    await session
      .update({
        type: this.type,
        moduleId: this.moduleId,
        startTimestamp: this.startTimestamp,
        endTimestamp: this.endTimestamp,
        code: this.code,
      })
      .catch(() => {
        return false;
      });

    return true;
  };

  public getModuleAsync = async (): Promise<Module | null> => {
    const moduleRecord = await ModuleSchema.findOne({
      where: {
        module_id: this.getModuleId,
      },
    });

    if (!moduleRecord) return null;

    return new Module({
      id: moduleRecord.dataValues.module_id,
      name: moduleRecord.dataValues.module_name,
      moduleLeader: moduleRecord.dataValues.module_leader_id,
    });
  };

  async toJsonAsync(): Promise<toJsonReturn> {
    const sessionAttendancesData = await this.getAttendancesAsync();

    const sessionAttendances = {
      attendances: sessionAttendancesData.attendances.map(
        (attendance: Attendance) => attendance.toJsonWithAttendance()
      ),
      total: sessionAttendancesData.total,
    };

    return {
      id: this.getId,
      type: await this.getTypeAsync().then((type) => type.getName),
      moduleId: this.getModuleId,
      startTime: this.startTimestamp,
      endTime: this.endTimestamp,
      sessionAttendances: sessionAttendances,
    };
  }
}

interface toJsonReturn {
  id: string;
  type: string;
  moduleId: string;
  startTime: Date;
  endTime: Date;
  sessionAttendances: {
    attendances: object[];
    total: number;
  };
}

interface constructorParams {
  id: string;
  type: string;
  moduleId: string;
  startTimestamp: Date;
  endTimestamp: Date;
  code: string;
}
