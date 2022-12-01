import { Course } from '../../database';

export async function generateCourseAsync(userId: string) {
  const user = await Course.create({
    course_name: 'test course',
    course_leader_id: userId,
  });

  return user;
}
