import { User as UserSchema, UserType as UserTypeSchema } from '@Database';

// User class for the server, contains all the information about a user
// and is used to create other user type objects
export class User {
  private _id: string;
  private _type: string;
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;
  private _email: string;

  // constructor for the user object
  constructor({
    userId,
    firstName,
    middleName,
    lastName,
    email,
    userTypeId,
  }: constructorParams) {
    this._id = userId;
    this._firstName = firstName;
    this._middleName = middleName || '';
    this._lastName = lastName;
    this._email = email;
    this._type = userTypeId;
  }

  // get the user id as a string
  public getId(): string {
    return this._id;
  }

  // get user type id as string
  public getUserType(): string {
    return this._type;
  }

  // get first name of user as string
  public getFirstName(): string {
    return this._firstName;
  }

  // get middle name of user as string
  public getMiddleName(): string {
    return this._middleName;
  }

  // get last name of user as string
  public getLastName(): string {
    return this._lastName;
  }

  // get email of user as string
  public getName(): string {
    return `${this._firstName} ${this._middleName} ${this._lastName}`;
  }

  // get email of user as string
  public getEmail(): string {
    return this._email;
  }

  // Sets user first name on object
  public setFirstName(firstName: string): void {
    if (firstName && firstName.length > 0 && firstName.length <= 20)
      this._firstName = firstName;
  }

  // Sets user middle name on object
  public setMiddleName(middleName: string): void {
    if (middleName && middleName.length > 0 && middleName.length <= 20)
      this._middleName = middleName;
  }

  // Sets user last name on object
  public setLastName(lastName: string): void {
    if (lastName && lastName.length > 0 && lastName.length <= 20)
      this._lastName = lastName;
  }

  // Sets user first middle and last name on object
  public setName(
    firstName: string,
    middleName: string,
    lastName: string
  ): void {
    this.setFirstName(firstName);
    this.setMiddleName(middleName);
    this.setLastName(lastName);
  }

  // Sets user email on object
  public setEmail(email: string): void {
    if (email && email.length > 0 && email.length <= 50) this._email = email;
  }

  // set user type of object
  public async setType(typeId: string) {
    // Check if the type exists in the database
    const type = await UserTypeSchema.findByPk(typeId);

    // If the type exists, set the type of the user
    if (!type) return;

    this._type = typeId;
  }

  // Converts the user object to a JSON object for sending to the client
  public async toJson(): Promise<String> {
    // Get the user type, if it exists else return type id
    const type = await UserTypeSchema.findByPk(this._type).then((type) =>
      type?.dataValues.user_type_name
        ? type.dataValues.user_type_name
        : this._type
    );

    // Convert the user to a json object and return it as a string
    return JSON.stringify({
      id: this._id,
      type: type,
      firstName: this._firstName,
      middleName: this._middleName,
      lastName: this._lastName,
      email: this._email,
    });
  }

  // uses verables on the object to update the user in the database
  // returns true if the user was updated, false if not
  public async updateDatabase(): Promise<boolean> {
    try {
      await UserSchema.update(
        {
          first_name: this._firstName,
          middle_name: this._middleName,
          last_name: this._lastName,
          email: this._email,
          _type: this._type,
        },
        {
          where: {
            user_id: this._id,
          },
        }
      );

      return true;
    } catch {}

    return false;
  }
}

interface constructorParams {
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  userTypeId: string;
}

export { constructorParams as userConstructorParams };
