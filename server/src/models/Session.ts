export class Session {
  private _id: string;
  private _type: string;
  private _tutorId: string;
  private _startTime: string;
  private _endTime: string;
  private _sessionCode: string;

  constructor(
    id: string,
    type: string,
    tutorId: string,
    startTime: string,
    endTime: string,
    sessionCode: string
  ) {
    this._id = id;
    this._type = type;
    this._tutorId = tutorId;
    this._startTime = startTime;
    this._endTime = endTime;
    this._sessionCode = sessionCode;
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
