export class Course {
  private _courseId: string;
  private _courseName: string;
  private _course_leader_id: string;

  constructor({ course_id, course_name, course_leader_id }: constructorParams) {
    this._courseId = course_id;
    this._courseName = course_name;
    this._course_leader_id = course_leader_id;
  }

  public getCourseId() {
    return this._courseId;
  }

  public getCourseName() {
    return this._courseName;
  }

  public getCourseLeaderId() {
    return this._course_leader_id;
  }

  public setCourseName(courseName: string) {
    if (courseName && courseName.length > 0 && courseName.length <= 20)
      this._courseName = courseName;
  }

  public setCourseLeaderId(courseLeaderId: string) {}
}

interface constructorParams {
  course_id: string;
  course_name: string;
  course_leader_id: string;
}
