import { Tutor } from '.';
import { User } from '@Database';

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
    //User.findOne({where: ()})

    return;
  }
}
