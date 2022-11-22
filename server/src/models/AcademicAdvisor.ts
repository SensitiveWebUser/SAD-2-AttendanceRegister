import { Tutor } from './Tutor';

export class AcademicAdvisor extends Tutor {
  private _adviseeList: object;

  constructor(
    id: number,
    type: number,
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

  public getAdviseeList() {
    return this._adviseeList;
  }
}
