export class Session {
  private _id: number;
  private _type: number;
  private _tutorId: number;
  private _startTime: Date;
  private _endTime: Date;
  private _sessionCode: string;

  constructor(
    id: number,
    type: number,
    tutorId: number,
    startTime: Date,
    endTime: Date,
    sessionCode: string
  ) {
    this._id = id;
    this._type = type;
    this._tutorId = tutorId;
    this._startTime = startTime;
    this._endTime = endTime;
    this._sessionCode = sessionCode;
  }

  public getId() {
    return this._id;
  }

  public getSessionType() {
    return this._type;
  }

  public getTutor() {
    return this._tutorId;
  }

  public getStartTime() {
    return this._startTime;
  }

  public getEndTime() {
    return this._endTime;
  }

  public getSessionCode() {
    return this._sessionCode;
  }
}
