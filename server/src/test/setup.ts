import { sequelize } from '../database/database';

// This function is called after each tests are done
// It will wipe the database clean
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// This runs after all tests are done
// It closes the database connection
afterAll(async () => {
  await sequelize.close();
});
