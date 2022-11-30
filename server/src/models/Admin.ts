import { User, UserToJsonReturn } from '../models';

export class Admin extends User {
  constructor({ userObject }: constructorParams) {
    super(userObject);
  }

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      ...(await super.toJsonAsync()),
    };
  }
}

type toJsonReturn = UserToJsonReturn;

interface constructorParams {
  userObject: User;
}
