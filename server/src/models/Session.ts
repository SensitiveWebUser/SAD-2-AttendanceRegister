export class Session {
  private _id: string;
  private _type: string;
  private _tutorId: string;
  private _moduleId: string;
  private _startTime: Date;
  private _endTime: Date;
  private _sessionCode: string;

  constructor({
    session_id,
    session_type_id,
    tutor_id,
    module_id,
    start_timestamp,
    end_timestamp,
    code,
  }: constructorParams) {
    this._id = session_id;
    this._type = session_type_id;
    this._tutorId = tutor_id;
    this._moduleId = module_id;
    this._startTime = start_timestamp;
    this._endTime = end_timestamp;
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
  session_id: string;
  session_type_id: string;
  tutor_id: string;
  module_id: string;
  start_timestamp: Date;
  end_timestamp: Date;
  code: string;
}
