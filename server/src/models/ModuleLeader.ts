import { Tutor } from './Tutor';

export class ModuleLeader extends Tutor {
  private _moduleId: string;

  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    sessionList: object,
    moduleId: string
  ) {
    super(id, type, firstName, middleName, lastName, email, sessionList);
    this._moduleId = moduleId;
  }

  public getModuleId() {
    return this._moduleId;
  }

  public updateAttendance() {}
}
