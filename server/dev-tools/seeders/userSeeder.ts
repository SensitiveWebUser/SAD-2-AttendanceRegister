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
    user_id: 'auth0|6386776b841043dd7a9e4d9f',
    user_type_id: academicAdvisorUserTypeId ?? '',
    first_name: 'academic',
    middle_name: '2',
    last_name: 'advisor',
    email: 'academic-advisor@localhost.com',
  },
  {
    user_id: 'auth0|6386776b841043dd7a9e4d9d',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: '2',
    last_name: 'test',
    email: 'student@localhost.com',
  },
  {
    user_id: 'auth0|6386776b841043dd7a9e4da1',
    user_type_id: moduleLeaderUserTypeId ?? '',
    first_name: 'module',
    middle_name: '2',
    last_name: 'leader',
    email: 'module-leader@localhost.com',
  },
  {
    user_id: 'auth0|6386776b841043dd7a9e4da0',
    user_type_id: courseLeaderUserTypeId ?? '',
    first_name: 'course',
    middle_name: '2',
    last_name: 'leader',
    email: 'course-leader@localhost.com',
  },
  {
    user_id: 'auth0|6386776b841043dd7a9e4d9e',
    user_type_id: tutorUserTypeId ?? '',
    first_name: 'tutor',
    middle_name: '2',
    last_name: 'test',
    email: 'tutor@localhost.com',
  },
  {
    user_id: 'auth0|6386776c841043dd7a9e4da3',
    user_type_id: administratorUserTypeId ?? '',
    first_name: '1',
    middle_name: '2',
    last_name: '3',
    email: 'administrator@localhost.com',
  },
  {
    user_id: 'auth0|63883066c78f5fe0d63baeaf',
    user_type_id: academicAdvisorUserTypeId ?? '',
    first_name: 'academic advisor',
    middle_name: 'academic advisor',
    last_name: 'academic advisor',
    email: 'academic-advisor2@localhost.com',
  },
  {
    user_id: 'auth0|63883066c78f5fe0d63baeb0',
    user_type_id: academicAdvisorUserTypeId ?? '',
    first_name: 'academic advisor',
    middle_name: 'academic advisor',
    last_name: 'academic advisor',
    email: 'academic-advisor3@localhost.com',
  },
  {
    user_id: 'auth0|63883066c78f5fe0d63baeb1',
    user_type_id: academicAdvisorUserTypeId ?? '',
    first_name: 'academic advisor',
    middle_name: 'academic advisor',
    last_name: 'academic advisor',
    email: 'academic-advisor4@localhost.com',
  },
  {
    user_id: 'auth0|63883066c78f5fe0d63baeb2',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: 'student',
    last_name: 'student',
    email: 'student1@localhost.com',
  },
  {
    user_id: 'auth0|63883066c78f5fe0d63baeb3',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: 'student',
    last_name: 'student',
    email: 'student2@localhost.com',
  },
  {
    user_id: 'auth0|63883068c78f5fe0d63baebb',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: 'student',
    last_name: 'student',
    email: 'student3@localhost.com',
  },
  {
    user_id: 'auth0|63883068c78f5fe0d63baebc',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: 'student',
    last_name: 'student',
    email: 'student4@localhost.com',
  },
  {
    user_id: 'auth0|63883068c78f5fe0d63baebd',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: 'student',
    last_name: 'student',
    email: 'student5@localhost.com',
  },
  {
    user_id: 'auth0|63883068c78f5fe0d63baebe',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: 'student',
    last_name: 'student',
    email: 'student6@localhost.com',
  },
  {
    user_id: 'auth0|63883068c78f5fe0d63baebf',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: 'student',
    last_name: 'student',
    email: 'student7@localhost.com',
  },
  {
    user_id: 'auth0|63883067c78f5fe0d63baeb5',
    user_type_id: studentUserTypeId ?? '',
    first_name: 'student',
    middle_name: 'student',
    last_name: 'student',
    email: 'student8@localhost.com',
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
