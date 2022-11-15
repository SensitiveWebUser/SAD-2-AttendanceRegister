import { sequelize } from '@Database';

// This function is called after each tests are done
// It will wipe the database clean
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// This runs after all tests are done
// It closes the database connection
afterAll(async () => {
  console.log('Jest stopping!');
  await sequelize.close();
});
