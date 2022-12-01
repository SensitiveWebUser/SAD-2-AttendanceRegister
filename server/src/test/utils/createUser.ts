import { User } from '../../database';

export async function generateUserAsync(userTypeId: string, userId: string) {
  const user = await User.create({
    user_id: userId,
    first_name: 'John',
    last_name: 'Smith',
    email: 'JohnSmith@localhost.com',
    user_type_id: userTypeId,
  });

  return user;
}
