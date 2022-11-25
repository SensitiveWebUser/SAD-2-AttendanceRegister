export class Session {
  private _id: string;
  private _type: string;
  private _tutorId: string;
  private _moduleId: string;
  private _startTime: Date;
  private _endTime: Date;
  private _sessionCode: string;

  constructor({
    sessionId,
    sessionTypeId,
    tutorId,
    moduleId,
    startTimestamp,
    endTimestamp,
    code,
  }: constructorParams) {
    this._id = sessionId;
    this._type = sessionTypeId;
    this._tutorId = tutorId;
    this._moduleId = moduleId;
    //TODO: Fix Invalid Date bug
    this._startTime = new Date(startTimestamp);
    this._endTime = new Date(endTimestamp);
    this._sessionCode = code;
  }

  public getId() {
    return this._id;
  }

  public getSessionTypeId() {
    return this._type;
  }

  public getTutorId() {
    return this._tutorId;
  }

  public getModuleId() {
    return this._moduleId;
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

interface constructorParams {
  sessionId: string;
  sessionTypeId: string;
  tutorId: string;
  moduleId: string;
  startTimestamp: number;
  endTimestamp: number;
  code: string;
}
