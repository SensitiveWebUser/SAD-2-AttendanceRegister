import { Tutor } from '.';

export class ModuleLeader extends Tutor {
  private _module: object;

  constructor() {
    super();
    this._module = {};
  }

  protected getModule() {
    return this._module;
  }

  protected updateAttendance() {
    //db.one('ALTER TABLE attendance...')
    return;
  }
}
