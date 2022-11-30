import debug from 'debug';
import { AdvisorStudentLink } from '../../src/database';
import userSeeder from './userSeeder';

const logger = debug('backend:seeder-advisor-student-link');

type ObjectType = {
  advisor_id: string;
  student_id: string;
};

const studentId = userSeeder.objects[0].user_id;
const advisorId = userSeeder.objects[4].user_id;

const objects: ObjectType[] = [
  {
    advisor_id: advisorId,
    student_id: studentId,
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
