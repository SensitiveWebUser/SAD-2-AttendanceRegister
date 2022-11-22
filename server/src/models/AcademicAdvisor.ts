import { Tutor } from '.';

export class AcademicAdvisor extends Tutor {
  private _adviseeList: object;

  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    sessionList: object,
    adviseeList: object
  ) {
    super(id, type, firstName, middleName, lastName, email, sessionList);
    this._adviseeList = new Array<Tutor>();
  }

  protected getadviseeList() {
    return this._adviseeList;
  }
}
