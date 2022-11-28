import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import { SessionType as ObjectType } from '@Database';

type ObjectType = {
  session_type_id: string;
  session_type_name: string;
};

const logger = debug('backend:seeder-session-type');

const objects: ObjectType[] = [
  {
    session_type_id: uuidv4(),
    session_type_name: 'Lecture',
  },
  {
    session_type_id: uuidv4(),
    session_type_name: 'Online',
  },
  {
    session_type_id: uuidv4(),
    session_type_name: 'Tutorial',
  },
];

async function isTableSeedableAsync() {
  const { count } = await ObjectType.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding session types...');
    await ObjectType.bulkCreate([...objects], { validate: true });
    logger('seeded session types successfully');
  }
}

export default { bulkCreateAsync, objects };
