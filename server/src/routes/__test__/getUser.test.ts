import { userTypeEnum } from '../../utils/userTypeEnum';
import { generateUserTypeAsync } from '../../test/utils/generateUserType';
import { generateUserAsync } from '../../test/utils/createUser';
import { app } from '../../app';
import request from 'supertest';

async function generateDataAsync() {
  const userType = await generateUserTypeAsync(userTypeEnum.ADMIN);
  const user = await generateUserAsync(
    userType.user_type_id as string,
    'auth0|4534fgrg'
  );

  return { user, userType };
}

describe('get user tests', () => {
  it('returns user data and 200 status code', async () => {
    const { user } = await generateDataAsync();

    const response = await request(app).get(`/api/users/${user.user_id}`);

    expect(response.status).toEqual(200);
  });

  it('returns 400 status code if user not found', async () => {
    await request(app).get('/api/users/123').send().expect(400);
  });
});
