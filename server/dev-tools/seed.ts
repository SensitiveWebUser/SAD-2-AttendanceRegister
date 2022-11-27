import debug from 'debug';
import userTypeSeeder from './seeders/userTypeSeeder';
import userSeeder from './seeders/userSeeder';
import attendanceSeeder from './seeders/attendanceSeeder';
import sessionSeeder from './seeders/sessionSeeder';
import sessionTypeSeeder from './seeders/sessionTypeSeeder';
import moduleSeeder from './seeders/moduleSeeder';
import courseSeeder from './seeders/courseSeeder';
import moduleCourseSeeder from './seeders/moduleCourseSeeder';
import advisorStudentLink from './seeders/advisorStudentLink';

const logger = debug('backend:seeder');

export default async function seedAsync() {
  logger('beginning seeding...');
  await userTypeSeeder.bulkCreateAsync();
  await sessionTypeSeeder.bulkCreateAsync();

  await userSeeder.bulkCreateAsync();
  await advisorStudentLink.bulkCreateAsync();

  await courseSeeder.bulkCreateAsync();
  await moduleSeeder.bulkCreateAsync();
  await moduleCourseSeeder.bulkCreateAsync();

  await sessionSeeder.bulkCreateAsync();
  await attendanceSeeder.bulkCreateAsync();
  logger('finished seeding!');
}
