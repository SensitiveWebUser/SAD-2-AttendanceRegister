import { Tutor } from '.';

export class CourseLeader extends Tutor {
  private _course: object;

  constructor() {
    super();
    this._course = {};
  }

  protected getCourse() {
    return this._course;
  }

  protected updateAttendance() {
    //db.one('ALTER TABLE attendance...')
    return;
  }
}
