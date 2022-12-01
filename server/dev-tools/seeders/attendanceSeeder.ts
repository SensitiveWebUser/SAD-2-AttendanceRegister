import debug from 'debug';
import { Attendance } from '../../src/database';
import sessionSeeder from './sessionSeeder';
import userSeeder from './userSeeder';

const logger = debug('backend:seeder-attendance');

type ObjectType = {
  session_id: string;
  user_id: string;
  attended: Date;
};

const studentId1 = userSeeder.objects[1].user_id;
const studentId2 = userSeeder.objects[9].user_id;
const studentId3 = userSeeder.objects[10].user_id;
const studentId4 = userSeeder.objects[11].user_id;

const objects: ObjectType[] = [
  {
    session_id: sessionSeeder.objects[0].session_id,
    user_id: studentId1,
    attended: new Date(),
  },
  {
    session_id: sessionSeeder.objects[0].session_id,
    user_id: studentId2,
    attended: new Date(),
  },
  {
    session_id: sessionSeeder.objects[0].session_id,
    user_id: studentId3,
    attended: new Date(),
  },
  {
    session_id: sessionSeeder.objects[1].session_id,
    user_id: studentId1,
    attended: new Date(),
  },
  {
    session_id: sessionSeeder.objects[1].session_id,
    user_id: studentId4,
    attended: new Date(),
  },
  {
    session_id: sessionSeeder.objects[2].session_id,
    user_id: studentId1,
    attended: new Date(),
  },
  {
    session_id: sessionSeeder.objects[2].session_id,
    user_id: studentId2,
    attended: new Date(),
  },
  {
    session_id: sessionSeeder.objects[2].session_id,
    user_id: studentId3,
    attended: new Date(),
  },
  {
    session_id: sessionSeeder.objects[2].session_id,
    user_id: studentId4,
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
