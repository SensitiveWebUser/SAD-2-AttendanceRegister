import { User, userConstructorParams } from '@Models';

export class Admin extends User {
  constructor({
    userId,
    firstName,
    middleName,
    lastName,
    email,
    userTypeId,
  }: constructorParams) {
    super({ userId, firstName, middleName, lastName, email, userTypeId });
  }

  createUser() {}

  updateUser() {}

  bulkImportUsers() {}

  initiatePasswordReset() {}
}

interface constructorParams extends userConstructorParams {}
