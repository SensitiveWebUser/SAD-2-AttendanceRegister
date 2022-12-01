import { app } from '../../app';
import request from 'supertest';
import { generateUserAsync } from '../../test/utils/createUser';
import { generateUserTypeAsync } from '../../test/utils/generateUserType';
import { userTypeEnum } from '../../utils/userTypeEnum';

describe('add courses tests', () => {
  it('returns course data and 200 status code', async () => {
    const userType = await generateUserTypeAsync(userTypeEnum.COURSE_LEADER);
    const courseLeader = await generateUserAsync(
      userType.user_type_id as string,
      'course|test'
    );

    const id = courseLeader.user_id;

    const response = await request(app)
      .post(`/api/courses?name=test&courseLeader=${id}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
  });
});
