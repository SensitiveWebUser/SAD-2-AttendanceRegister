import {
  Tutor,
  tutorConstructorParams,
  Student,
  Session,
  Module,
} from '@Models';

import { Module as ModuleSchema } from '@Database';

import { mapModule } from '@Utils/dataMapper';
export class ModuleLeader extends Tutor {
  private _moduleId: string;

  constructor({
    userId,
    firstName,
    middleName,
    lastName,
    email,
    userTypeId,
    moduleId,
  }: constructorParams) {
    super({ userId, firstName, middleName, lastName, email, userTypeId });
    this._moduleId = moduleId;
  }

  public getModuleId = (): string => {
    return this._moduleId;
  };

  public getModule = async (): Promise<Module | null> => {
    const moduleRecord = await ModuleSchema.findByPk(this._moduleId);

    if (!moduleRecord) return null;

    return new Module(mapModule(moduleRecord.dataValues));
  };

  public getStudentsAttended = async (): Promise<studentsAttendedReport> => {
    const report: studentsAttendedReport = { data: [], amountOfStudents: 0 };

    return report;
  };
}

interface studentsAttendedReport {
  data: Array<{
    student: Student;
    sessionsAttended: Array<{
      session: Session;
      timestamp: Date;
    }>;
    amountOfStudentSessions: number;
  }>;
  amountOfStudents: number;
}

interface constructorParams extends tutorConstructorParams {
  moduleId: string;
}
