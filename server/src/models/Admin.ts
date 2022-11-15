import { User } from '.';
import { User as UserSchema } from '@Database';
import { Json } from 'sequelize/types/utils';

export class Admin extends User {
  constructor() {
    super();
  }

  createUser(
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    userTypeId: string
  ) {
    UserSchema.create({
      user_type_id: userTypeId,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: email,
    });
  }

  updateUser(field: string, value: string) {
    UserSchema.findByPk().then((user) => {
      user?.update({ email: value });
    });
  }

  bulkImportUsers(users: Object) {
    //UserSchema.bulkCreate()
  }

  initiatePasswordReset() {
    UserSchema.findByPk().then((user) => {
      user?.update({});
    });
  }
}
