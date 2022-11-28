import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../../app';

import { User, UserType } from '../../database/index';

const updateDb = async () => {
  // Create a user type
  const userType = await UserType.create({
    user_type_id: uuidv4(),
    user_type_name: 'Admin',
  });

  // Create a User
  const user = await User.create({
    user_id: '1',
    first_name: 'John',
    last_name: 'Smith',
    email: 'JohnSmith@localhost.com',
    user_type_id: userType.user_type_id,
  });

  return { user, userType };
};

it('returns user data and 200 status code', async () => {
  // Create user in database
  const { user } = await updateDb();

  // Get the user
  const response = await request(app).get(`/api/users/${user.user_id}`);

  expect(response.status).toEqual(200);
  expect(JSON.parse(response.body)).toEqual({
    id: user.user_id,
    firstName: user.first_name,
    middleName: null,
    lastName: user.last_name,
    email: user.email,
    type: user.user_type_id,
  });
});

it('returns 404 status code if user not found', async () => {
  await request(app).get('/api/users/123').send().expect(404);
});
