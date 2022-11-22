import { User } from '.';

export class Tutor extends User {
  private _sessionList: object;

  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    sessionList: object
  ) {
    super(id, type, firstName, middleName, lastName, email);
    this._sessionList = sessionList;
  }

  protected getSessions() {
    return this._sessionList;
  }
}
