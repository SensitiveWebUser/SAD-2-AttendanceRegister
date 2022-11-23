import { Sequelize } from 'sequelize';

const URI =
  process.env.NODE_ENV === 'test'
    ? 'sqlite::memory:'
    : (process.env.POSTGRES_URI as string);

// Create a new instance of Sequelize
// The first argument is the database name
const sequelize = new Sequelize(URI, {
  dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres',
  logging: process.env.NODE_ENV === 'development',
});

export { sequelize };
