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

  createUser() {
    console.log('TODO FUNCTION');
  }

  updateUser() {
    console.log('TODO FUNCTION');
  }

  bulkImportUsers() {
    console.log('TODO FUNCTION');
  }

  initiatePasswordReset() {
    console.log('TODO FUNCTION');
  }
}
