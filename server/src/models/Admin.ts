import { User } from '.';
import { User as UserSchema } from '@Database';

export class Admin extends User {
  constructor() {
    super();
  }

  createUser() {}

  updateUser() {}

  bulkImportUsers() {}

  initiatePasswordReset() {}
}
