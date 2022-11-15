import request from 'supertest';
import { app } from '../../app';

import { User, UserType } from '@Database';

it('returns user data and 200 status code', async () => {
  // Create a UserType
  const userType = await UserType.create({
    user_type_name: 'Admin',
  });

  console.log(userType);

  // Create a User
  const user = await User.create({
    first_name: 'John',
    last_name: 'Smith',
    email: 'JohnSmith@localhost.com',
    user_type_id: userType.user_type_id as string,
  });

  // Get the user
  await request(app).get(`/api/users/${user.user_id}`).send().expect(200);
});

it('returns 404 status code if user not found', async () => {
  await request(app).get('/api/users/123').send().expect(404);
});
