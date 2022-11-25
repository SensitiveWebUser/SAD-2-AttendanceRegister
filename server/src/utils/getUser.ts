import { NotFoundError } from '@Errors';
import { User as UserSchema } from '@Database';

import { User } from '@Models';

export const getUser = async (id: string): Promise<User> => {
  // Get the user from the database
  const user = await UserSchema.findByPk(id);

  // If the user is not found, throw a 404 error
  if (!user) {
    throw new NotFoundError();
  }

  // convert the user to a User model

  return new User(user.dataValues);
};
