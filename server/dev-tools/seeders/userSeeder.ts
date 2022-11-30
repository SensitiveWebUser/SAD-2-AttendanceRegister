import debug from 'debug';
import { User } from '../../src/database';
import userTypeSeeder from './userTypeSeeder';

const logger = debug('backend:seeder-user');

type ObjectType = {
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  user_type_id: string;
};

const studentUserTypeId = userTypeSeeder.objects.find(
  (x) => x.user_type_name === 'Student'
)?.user_type_id;

const tutorUserTypeId = userTypeSeeder.objects.find(
  (x) => x.user_type_name === 'Tutor'
)?.user_type_id;

const moduleLeaderUserTypeId = userTypeSeeder.objects.find(
  (x) => x.user_type_name === 'Module Leader'
)?.user_type_id;

const courseLeaderUserTypeId = userTypeSeeder.objects.find(
  (x) => x.user_type_name === 'Course Leader'
)?.user_type_id;

const academicAdvisorUserTypeId = userTypeSeeder.objects.find(
  (x) => x.user_type_name === 'Academic Advisor'
)?.user_type_id;

const administratorUserTypeId = userTypeSeeder.objects.find(
  (x) => x.user_type_name === 'Administrator'
)?.user_type_id;

const objects: ObjectType[] = [
  {
    user_id: 'auth0|abc',
    first_name: '1',
    middle_name: '2',
    last_name: '3',
    email: '1@localhost.com',
    user_type_id: studentUserTypeId ?? '',
  },
  {
    user_id: 'auth0|def',
    first_name: '4',
    middle_name: '5',
    last_name: '6',
    email: '2@localhost.com',
    user_type_id: tutorUserTypeId ?? '',
  },
  {
    user_id: 'auth0|ghi',
    first_name: '7',
    middle_name: '8',
    last_name: '9',
    email: '3@localhost.com',
    user_type_id: moduleLeaderUserTypeId ?? '',
  },
  {
    user_id: 'auth0|jkl',
    first_name: '10',
    middle_name: '11',
    last_name: '12',
    email: '4@localhost.com',
    user_type_id: courseLeaderUserTypeId ?? '',
  },
  {
    user_id: 'auth0|mno',
    first_name: '13',
    middle_name: '14',
    last_name: '15',
    email: '5@localhost.com',
    user_type_id: academicAdvisorUserTypeId ?? '',
  },
  {
    user_id: 'auth0|pqr',
    first_name: '16',
    middle_name: '17',
    last_name: '18',
    email: '6@localhost.com',
    user_type_id: administratorUserTypeId ?? '',
  },
];

async function isTableSeedableAsync() {
  const { count } = await User.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding users...');
    await User.bulkCreate([...objects], { validate: true });
    logger('seeded users successfully');
  }
}

export default { bulkCreateAsync, objects };
