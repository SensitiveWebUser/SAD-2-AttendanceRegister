import debug from 'debug';
import { UserCourseLink } from '../../src/database';
import userSeeder from './userSeeder';
import courseSeeder from './courseSeeder';

const logger = debug('backend:seeder-user-course-link');

type ObjectType = {
  course_id: string;
  user_id: string;
};

const studentId = userSeeder.objects[0].user_id;
const courseId = courseSeeder.objects[0].course_id;

const objects: ObjectType[] = [
  {
    user_id: studentId,
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
