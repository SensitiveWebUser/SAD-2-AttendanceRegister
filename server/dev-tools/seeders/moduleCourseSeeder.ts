import debug from 'debug';
import { ModuleCourseLink } from '../../src/database';
import courseSeeder from './courseSeeder';
import moduleSeeder from './moduleSeeder';

const logger = debug('backend:seeder-module-course-link');

type ObjectType = {
  module_id: string;
  course_id: string;
};

const objects: ObjectType[] = [
  {
    module_id: moduleSeeder.objects[0].module_id,
    course_id: courseSeeder.objects[0].course_id,
  },
];

async function isTableSeedableAsync() {
  const { count } = await ModuleCourseLink.findAndCountAll();
  return count === 0;
}

async function bulkCreateAsync() {
  if (await isTableSeedableAsync()) {
    logger('seeding module course linker...');
    await ModuleCourseLink.bulkCreate([...objects], { validate: true });
    logger('seeded module course linker successfully');
  }
}

export default { bulkCreateAsync, objects };
