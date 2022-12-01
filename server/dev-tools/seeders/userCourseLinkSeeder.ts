import debug from 'debug';
import { UserCourseLink } from '../../src/database';
import userSeeder from './userSeeder';
import courseSeeder from './courseSeeder';

const logger = debug('backend:seeder-user-course-link');

type ObjectType = {
  course_id: string;
  user_id: string;
};

const studentId1 = userSeeder.objects[1].user_id;
const studentId2 = userSeeder.objects[9].user_id;
const studentId3 = userSeeder.objects[10].user_id;
const studentId4 = userSeeder.objects[11].user_id;

const courseId = courseSeeder.objects[0].course_id;

const objects: ObjectType[] = [
  {
    user_id: studentId1,
    course_id: courseId,
  },
  {
    user_id: studentId2,
    course_id: courseId,
  },
  {
    user_id: studentId3,
    course_id: courseId,
  },
  {
    user_id: studentId4,
    course_id: courseId,
  },
];

async function isTableSeedableAsync() {
  const { count } = await UserCourseLink.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding user course link...');
    await UserCourseLink.bulkCreate([...objects], { validate: true });
    logger('seeded user course link successfully');
  }
}

export default { bulkCreateAsync, objects };
