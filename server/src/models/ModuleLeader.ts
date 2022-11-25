import { Tutor, tutorConstructorParams } from './Tutor';

export class ModuleLeader extends Tutor {
  private _moduleId: string;

  constructor({
    user_id,
    first_name,
    middle_name,
    last_name,
    email,
    user_type_id,
    module_id,
  }: constructorParams) {
    super({ user_id, first_name, middle_name, last_name, email, user_type_id });
    this._moduleId = module_id;
  }

  public getModuleId() {
    return this._moduleId;
  }

  public updateAttendance() {}
}

interface constructorParams extends tutorConstructorParams {
  module_id: string;
}
