import { v4 as uuidv4 } from 'uuid';
import { Module } from '@Database';
import userSeeder from './userSeeder';
import sessionSeeder from './sessionSeeder';
import debug from 'debug';

const logger = debug('backend:seeder-module');

type ObjectType = {
  module_id: string;
  module_name: string;
  module_leader_id: string;
};

const moduleLeader = userSeeder.objects[2];

const objects: ObjectType[] = [
  {
    module_id: uuidv4(),
    module_name: 'cooking 101',
    module_leader_id: moduleLeader.user_id,
  },
];

async function isTableSeedableAsync() {
  const { count } = await Module.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding modules...');
    await Module.bulkCreate([...objects], { validate: true });
    logger('seeded modules successfully');
  }
}

export default { bulkCreateAsync, objects };
