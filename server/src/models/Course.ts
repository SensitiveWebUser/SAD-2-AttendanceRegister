export class Course {
  private _courseId: string;
  private _courseName: string;
  private _courseLeaderId: string;

  constructor({ courseId, courseName, courseLeaderId }: constructorParams) {
    this._courseId = courseId;
    this._courseName = courseName;
    this._courseLeaderId = courseLeaderId;
  }

  public getCourseId() {
    return this._courseId;
  }

  public getCourseName() {
    return this._courseName;
  }

  public getCourseLeaderId() {
    return this._courseLeaderId;
  }

  public setCourseName(courseName: string) {
    if (courseName && courseName.length > 0 && courseName.length <= 20)
      this._courseName = courseName;
  }

  public setCourseLeaderId(courseLeaderId: string) {}
}

interface constructorParams {
  courseId: string;
  courseName: string;
  courseLeaderId: string;
}
