import request from 'supertest';
import { app } from '../../app';

import { User, UserType } from '@Database';

const updateDb = async () => {
  // Create a user type
  const userType = await UserType.create({
    user_type_id: '1',
    user_type_name: 'Admin',
  });

  // Create a User
  const user = await User.create({
    user_id: '1',
    first_name: 'John',
    last_name: 'Smith',
    email: 'JohnSmith@localhost.com',
    user_type_id: userType.user_type_id as string,
  });

  return { user, userType };
};

it('returns user data and 200 status code', async () => {
  // Create user in database
  const { user, userType } = await updateDb();

  // Get the user
  const response = await request(app).get(`/api/user/${user.user_id}`);

  expect(response.status).toEqual(200);
  expect(JSON.parse(response.body)).toEqual({
    id: user.user_id,
    firstName: user.first_name,
    middleName: '',
    lastName: user.last_name,
    email: user.email,
    type: userType.user_type_name,
  });
});

it('returns 404 status code if user not found', async () => {
  await request(app).get('/api/user/123').send().expect(404);
});
