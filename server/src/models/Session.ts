export class Session {
  private _id: string;
  private _type: string;
  private _tutorId: string;
  private _startTime: Date;
  private _endTime: Date;
  private _sessionCode: string;

  constructor() {
    this._id = '';
    this._type = '';
    this._tutorId = '';
    this._startTime = new Date();
    this._endTime = new Date();
    this._sessionCode = '';
  }

  protected getId() {
    return this._id;
  }

  protected getSessionType() {
    return this._type;
  }

  protected getTutor() {
    return this._tutorId;
  }

  protected getStartTime() {
    return this._startTime;
  }

  protected getEndTime() {
    return this._endTime;
  }

  protected getSessionCode() {
    return this._sessionCode;
  }
}
