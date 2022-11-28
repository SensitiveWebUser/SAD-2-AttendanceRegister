import { UserType } from '../models';
import { User as UserSchema, UserType as UserTypeSchema } from '../database';

export class User {
  id: string;
  type: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;

  constructor({
    id,
    type,
    firstName,
    middleName,
    lastName,
    email,
  }: constructorParams) {
    this.id = id;
    this.type = type;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
  }

  //getters
  public get getId(): string {
    return this.id;
  }

  public async getType(): Promise<UserType> {
    const userTypeRecord = await UserTypeSchema.findByPk(this.type);

    const type = new UserType({
      id: userTypeRecord!.dataValues.user_type_id,
      name: userTypeRecord!.dataValues.user_type_name,
    });

    return type;
  }

  public get getFirstName(): string {
    return this.firstName;
  }

  public get getMiddleName(): string {
    return this.middleName;
  }

  public get getLastName(): string {
    return this.lastName;
  }

  public get getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }

  //setters
  public set setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public set setMiddleName(middleName: string) {
    this.middleName = middleName;
  }

  public set setLastName(lastName: string) {
    this.lastName = lastName;
  }

  public set setEmail(email: string) {
    this.email = email;
  }

  public set setType(typeId: string) {
    this.type = typeId;
  }

  public setName = (
    firstName: string,
    middleName: string,
    lastName: string
  ) => {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  };

  //methods
  public updateDatabaseAsync = async (): Promise<boolean> => {
    const user = await UserSchema.findByPk(this.getId);

    if (!user) return false;

    await user
      .update({
        first_name: this.firstName,
        user_type_id: await this.getType().then((type) => type?.getId),
        middle_name: this.middleName,
        last_name: this.lastName,
        email: this.email,
      })
      .catch(() => {
        return false;
      });

    return true;
  };

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      id: this.id,
      type: await this.getType().then((type) => type?.getName || ''),
      firstName: this.firstName,
      middleName: this.middleName || '',
      lastName: this.lastName,
      email: this.email,
    };
  }
}

interface toJsonReturn {
  id: string;
  type: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

interface constructorParams {
  id: string;
  type: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

export { toJsonReturn as UserToJsonReturn };
export { constructorParams as UserConstructorParams };
