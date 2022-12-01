import debug from 'debug';
import { AdvisorStudentLink } from '../../src/database';
import userSeeder from './userSeeder';

const logger = debug('backend:seeder-advisor-student-link');

type ObjectType = {
  advisor_id: string;
  student_id: string;
};

const studentId1 = userSeeder.objects[1].user_id;
const studentId2 = userSeeder.objects[9].user_id;
const studentId3 = userSeeder.objects[10].user_id;
const studentId4 = userSeeder.objects[11].user_id;

const advisorId1 = userSeeder.objects[0].user_id;
const advisorId2 = userSeeder.objects[6].user_id;
const advisorId3 = userSeeder.objects[7].user_id;
const advisorId4 = userSeeder.objects[8].user_id;

const objects: ObjectType[] = [
  {
    advisor_id: advisorId1,
    student_id: studentId1,
  },
  {
    advisor_id: advisorId2,
    student_id: studentId2,
  },
  {
    advisor_id: advisorId3,
    student_id: studentId3,
  },
  {
    advisor_id: advisorId4,
    student_id: studentId4,
  },
];

async function isTableSeedableAsync() {
  const { count } = await AdvisorStudentLink.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding attendance...');
    await AdvisorStudentLink.bulkCreate([...objects], { validate: true });
    logger('seeded attendance successfully');
  }
}

export default { bulkCreateAsync, objects };
