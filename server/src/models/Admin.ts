import { User } from './User';

export class Admin extends User {
  constructor(
    id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string
  ) {
    super(id, type, firstName, middleName, lastName, email);
  }

  // createUser() {}

  // updateUser() {}

  // bulkImportUsers() {}

  // initiatePasswordReset() {}
}
