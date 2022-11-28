import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import { Session } from '@Database';
import userSeeder from './userSeeder';
import sessionTypeSeeder from './sessionTypeSeeder';
import moduleSeeder from './moduleSeeder';

const logger = debug('backend:seeder-session');

type ObjectType = {
  session_id: string;
  session_type_id: string;
  tutor_id: string;
  module_id: string;
  user_id: string;
  start_timestamp: Date;
  end_timestamp: Date;
  code: string;
};

const studentUser = userSeeder.objects[0];
const tutorUser = userSeeder.objects[1];

const tutorialSessionTypeId = sessionTypeSeeder.objects.find(
  (x) => x.session_type_name === 'Tutorial'
)?.session_type_id;
const lectureSessionTypeId = sessionTypeSeeder.objects.find(
  (x) => x.session_type_name === 'Lecture'
)?.session_type_id;
const onlineSessionTypeId = sessionTypeSeeder.objects.find(
  (x) => x.session_type_name === 'Online'
)?.session_type_id;

const moduleId = moduleSeeder.objects[0].module_id;

const objects: ObjectType[] = [
  {
    session_id: uuidv4(),
    session_type_id: tutorialSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId,
    user_id: studentUser.user_id,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'code',
  },
  {
    session_id: uuidv4(),
    session_type_id: lectureSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId,
    user_id: studentUser.user_id,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'code',
  },
  {
    session_id: uuidv4(),
    session_type_id: onlineSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId,
    user_id: studentUser.user_id,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'code',
  },
];

async function isTableSeedableAsync() {
  const { count } = await Session.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding sessions...');
    await Session.bulkCreate([...objects], { validate: true });
    logger('seeded sessions successfully');
  }
}

export default { bulkCreateAsync, objects };
