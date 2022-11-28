import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import { UserType as ObjectType } from '../../src/database';

type ObjectType = {
  user_type_id: string;
  user_type_name: string;
};

const logger = debug('backend:seeder-user-type');

const objects: ObjectType[] = [
  {
    user_type_id: uuidv4(),
    user_type_name: 'Student',
  },
  {
    user_type_id: uuidv4(),
    user_type_name: 'Tutor',
  },
  {
    user_type_id: uuidv4(),
    user_type_name: 'Module Leader',
  },
  {
    user_type_id: uuidv4(),
    user_type_name: 'Course Leader',
  },
  {
    user_type_id: uuidv4(),
    user_type_name: 'Academic Advisor',
  },
  {
    user_type_id: uuidv4(),
    user_type_name: 'Administrator',
  },
];

async function isTableSeedableAsync() {
  const { count } = await ObjectType.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding user types...');
    await ObjectType.bulkCreate([...objects], { validate: true });
    logger('seeded user types successfully');
  }
}

export default { bulkCreateAsync, objects };
