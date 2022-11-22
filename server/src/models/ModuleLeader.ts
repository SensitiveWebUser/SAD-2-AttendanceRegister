import { Tutor } from '.';

export class ModuleLeader extends Tutor {
  private _module: string;

  constructor(
    id: string,
    type: string,
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

  protected getModule() {
    return this._module;
  }

  protected updateAttendance() {}
}
