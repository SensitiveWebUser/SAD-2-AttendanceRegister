import { Sequelize } from 'sequelize';

const URI = process.env.POSTGRES_URI as string;

// Create a new instance of Sequelize
// The first argument is the database name
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development',
});

export { sequelize };
