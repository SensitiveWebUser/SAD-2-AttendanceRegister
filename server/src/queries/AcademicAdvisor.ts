import { Tutor } from '.';

export class AcademicAdvisor extends Tutor {
  private _adviseeList: Array<Tutor>;

  constructor() {
    super();
    this._adviseeList = new Array<Tutor>();
  }

  protected getadviseeList() {
    return this._adviseeList;
  }
}
