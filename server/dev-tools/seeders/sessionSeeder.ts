import debug from 'debug';
import { v4 as uuidv4 } from 'uuid';
import { Session } from '../../src/database';
import moduleSeeder from './moduleSeeder';
import sessionTypeSeeder from './sessionTypeSeeder';
import userSeeder from './userSeeder';

const logger = debug('backend:seeder-session');

type ObjectType = {
  session_id: string;
  session_type_id: string;
  tutor_id: string;
  module_id: string;
  start_timestamp: Date;
  end_timestamp: Date;
  code: string;
};

const tutorUser = userSeeder.objects[4];

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
const moduleId1 = moduleSeeder.objects[1].module_id;
const moduleId2 = moduleSeeder.objects[2].module_id;

const objects: ObjectType[] = [
  {
    session_id: uuidv4(),
    session_type_id: tutorialSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'abcd',
  },
  {
    session_id: uuidv4(),
    session_type_id: lectureSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'efgh',
  },
  {
    session_id: uuidv4(),
    session_type_id: onlineSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'ijkl',
  },
  {
    session_id: uuidv4(),
    session_type_id: onlineSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId1,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'aaaa',
  },
  {
    session_id: uuidv4(),
    session_type_id: tutorialSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId1,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'bbbb',
  },
  {
    session_id: uuidv4(),
    session_type_id: lectureSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId2,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'cccc',
  },
  {
    session_id: uuidv4(),
    session_type_id: lectureSessionTypeId ?? '',
    tutor_id: tutorUser.user_id,
    module_id: moduleId2,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'dddd',
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
