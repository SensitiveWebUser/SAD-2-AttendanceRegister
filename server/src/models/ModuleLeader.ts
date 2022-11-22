import { Tutor } from './Tutor';

export class ModuleLeader extends Tutor {
  private _module: string;

  constructor(
    id: number,
    type: number,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    sessionList: object,
    module: string
  ) {
    super(id, type, firstName, middleName, lastName, email, sessionList);
    this._module = module;
  }

  public getModule() {
    return this._module;
  }

  public updateAttendance() {}
}
