export class User {
  private _id: string;
  private _type: string;
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;
  private _email: string;

  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string
  ) {
    this._id = id;
    this._type = type;
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._email = email;
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
    this._firstName = firstName;
  }

  protected setMiddleName(middleName: string) {
    this._middleName = middleName;
  }

  protected setLastName(lastName: string) {
    this._lastName = lastName;
  }

  protected setName(firstName: string, middleName: string, lastName: string) {
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
  }

  protected setEmail(email: string) {
    this._email = email;
  }

  protected toJson() {
    return {};
  }

  protected generateAttendanceReport() {
    return {};
  }
}
