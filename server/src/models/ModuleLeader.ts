import { Tutor, tutorConstructorParams } from '@Models';

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

  public getModuleId() {
    return this._moduleId;
  }
}

interface constructorParams extends tutorConstructorParams {
  moduleId: string;
}
