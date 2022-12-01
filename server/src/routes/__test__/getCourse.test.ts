import { userTypeEnum } from '../../utils/userTypeEnum';
import { app } from '../../app';
import request from 'supertest';
import { generateUserTypeAsync } from '../../test/utils/generateUserType';
import { generateUserAsync } from '../../test/utils/createUser';
import { generateCourseAsync } from '../../test/utils/generateCourse';

async function generateDataAsync() {
  const userType = await generateUserTypeAsync(userTypeEnum.COURSE_LEADER);
  const user = await generateUserAsync(
    userType.user_type_id as string,
    'user|23423'
  );
  const course = await generateCourseAsync(user.user_id as string);

  return { user, userType, course };
}

describe('get courses tests', () => {
  it('returns course data and 200 status code', async () => {
    const { course } = await generateDataAsync();

    const response = await request(app).get(`/api/courses/${course.course_id}`);

    expect(response.status).toEqual(200);
  });

  it('returns 404 status code if course not found', async () => {
    await request(app).get('/api/courses/123').send().expect(404);
  });
});
