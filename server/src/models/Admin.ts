import { User, userConstructorParams } from './User';

export class Admin extends User {
  constructor({
    user_id,
    first_name,
    middle_name,
    last_name,
    email,
    user_type_id,
  }: constructorParams) {
    super({ user_id, first_name, middle_name, last_name, email, user_type_id });
  }

  createUser() {}

  updateUser() {}

  bulkImportUsers() {}

  initiatePasswordReset() {}
}

interface constructorParams extends userConstructorParams {}
