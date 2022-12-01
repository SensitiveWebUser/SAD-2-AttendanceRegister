import debug from 'debug';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../../src/database';
import userSeeder from './userSeeder';

const logger = debug('backend:seeder-course');

type ObjectType = {
  course_id: string;
  course_name: string;
  course_leader_id: string;
};

const courseLeader = userSeeder.objects[3];

const objects: ObjectType[] = [
  {
    course_id: uuidv4(),
    course_name: 'cooking course',
    course_leader_id: courseLeader.user_id,
  },
  {
    course_id: uuidv4(),
    course_name: 'video games',
    course_leader_id: courseLeader.user_id,
  },
];

async function isTableSeedableAsync() {
  const { count } = await Course.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding courses...');
    await Course.bulkCreate([...objects], { validate: true });
    logger('seeded courses successfully');
  }
}

export default { bulkCreateAsync, objects };
