import { Tutor } from './Tutor';
import { Student } from './Student';

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
    this._adviseeList = new Array<Student>();
  }

  public getAdviseeList() {
    return this._adviseeList;
  }
}
