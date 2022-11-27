import { Attendance } from '@Database';
import userSeeder from './userSeeder';
import sessionSeeder from './sessionSeeder';
import debug from 'debug';

const logger = debug('backend:seeder-attendance');

type ObjectType = {
  session_id: string;
  user_id: string;
  attended: Date;
};

const objects: ObjectType[] = [
  {
    session_id: sessionSeeder.objects[0].session_id,
    user_id: userSeeder.objects[0].user_id,
    attended: new Date(),
  },
];

async function isTableSeedableAsync() {
  const { count } = await Attendance.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding attendance...');
    await Attendance.bulkCreate([...objects], { validate: true });
    logger('seeded attendance successfully');
  }
}

export default { bulkCreateAsync, objects };
