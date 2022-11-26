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

  public getId() {
    return this._id;
  }

  public getUserType() {
    return this._type;
  }

  public getFirstName() {
    return this._firstName;
  }

  public getMiddleName() {
    return this._middleName;
  }

  public getLastName() {
    return this._lastName;
  }

  public getName() {
    return `${this._firstName} ${this._middleName} ${this._lastName}`;
  }

  public getEmail() {
    return this._email;
  }

  public setFirstName(firstName: string) {
    this._firstName = firstName;
  }

  public setMiddleName(middleName: string) {
    this._middleName = middleName;
  }

  public setLastName(lastName: string) {
    this._lastName = lastName;
  }

  public setName(firstName: string, middleName: string, lastName: string) {
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
  }

  public setEmail(email: string) {
    this._email = email;
  }

  public toJson() {
    return JSON.stringify({
      id: this._id,
      type: this._type,
      firstName: this._firstName,
      middleName: this._middleName,
      lastName: this._lastName,
      email: this._email,
    });
  }

  public generateAttendanceReport() {
    console.log('TODO FUNCTION');
  }
}
