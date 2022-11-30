import debug from 'debug';
import advisorStudentLink from './seeders/advisorStudentLinkSeeder';
import attendanceSeeder from './seeders/attendanceSeeder';
import courseSeeder from './seeders/courseSeeder';
import moduleCourseSeeder from './seeders/moduleCourseSeeder';
import moduleSeeder from './seeders/moduleSeeder';
import sessionSeeder from './seeders/sessionSeeder';
import sessionTypeSeeder from './seeders/sessionTypeSeeder';
import userCourseLinkSeeder from './seeders/userCourseLinkSeeder';
import userSeeder from './seeders/userSeeder';
import userTypeSeeder from './seeders/userTypeSeeder';

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
  await userCourseLinkSeeder.bulkCreateAsync();

  await sessionSeeder.bulkCreateAsync();
  await attendanceSeeder.bulkCreateAsync();
  logger('finished seeding!');
}
