import { Session, User } from '.';

export class Tutor extends User {
  private _sessionList: Array<Session>;

  constructor() {
    super();
    this._sessionList = new Array<Session>();
  }

  protected getSessions() {
    return this._sessionList;
  }
}
