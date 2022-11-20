import { Tutor } from '.';
import {
  Module as ModuleSchema,
  Attendance as AttendanceSchema,
} from '@Database';
import { Sequelize } from 'sequelize';

export class ModuleLeader extends Tutor {
  private _module: string;

  constructor() {
    super();
    this._module = JSON.stringify(ModuleSchema.getAttributes().module_name);
  }

  protected getModule() {
    return this._module;
  }

  protected updateAttendance = async (
    attendanceId: string,
    updatedAttendance: string
  ) => {
    const attendanceData = await AttendanceSchema.findByPk(attendanceId).then(
      (data) => {
        //data?.update(data.attended, updatedAttendance);
      }
    );
    return;
  };
}
