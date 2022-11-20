import { Session as SessionSchema } from '@Database';

export class Session {
  private _id: string;
  private _type: string;
  private _tutorId: string;
  private _startTime: string;
  private _endTime: string;
  private _sessionCode: string;

  constructor() {
    this._id = JSON.stringify(SessionSchema.getAttributes().session_id);
    this._type = JSON.stringify(SessionSchema.getAttributes().session_type_id);
    this._tutorId = JSON.stringify(SessionSchema.getAttributes().tutor_id);
    this._startTime = JSON.stringify(
      SessionSchema.getAttributes().start_timestamp
    );
    this._endTime = JSON.stringify(SessionSchema.getAttributes().end_timestamp);
    this._sessionCode = JSON.stringify(SessionSchema.getAttributes().code);
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
