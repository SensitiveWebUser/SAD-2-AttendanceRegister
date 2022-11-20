import { User as UserSchema } from '@Database';

export class User {
  private _id: string;
  private _type: string;
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;
  private _email: string;

  constructor() {
    this._id = JSON.stringify(UserSchema.getAttributes().user_id);
    this._type = JSON.stringify(UserSchema.getAttributes().user_type_id);
    this._firstName = JSON.stringify(UserSchema.getAttributes().first_name);
    this._middleName = JSON.stringify(UserSchema.getAttributes().middle_name);
    this._lastName = JSON.stringify(UserSchema.getAttributes().last_name);
    this._email = JSON.stringify(UserSchema.getAttributes().email);
  }

  protected getId() {
    return this._id;
  }

  protected getUserType() {
    return this._type;
  }

  protected getFirstName() {
    return this._firstName;
  }

  protected getMiddleName() {
    return this._middleName;
  }

  protected getLastName() {
    return this._lastName;
  }

  protected getName() {
    return `${this._firstName} ${this._middleName} ${this._lastName}`;
  }

  protected getEmail() {
    return this._email;
  }

  protected setFirstName(firstName: string) {
    firstName = this._firstName;
  }

  protected setMiddleName(middleName: string) {
    middleName = this._middleName;
  }

  protected setLastName(lastName: string) {
    lastName = this._lastName;
  }

  protected setName(firstName: string, middleName: string, lastName: string) {
    firstName = this._firstName;
    middleName = this._middleName;
    lastName = this._lastName;
  }

  protected setEmail(email: string) {
    email = this._email;
  }

  protected toJson() {
    return {};
  }

  protected generateAttendanceReport() {
    return {};
  }
}
