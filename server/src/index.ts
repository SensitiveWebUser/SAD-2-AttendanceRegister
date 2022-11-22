import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env.local' });
console.log(process.env);

import { app } from './app';
import 'express-async-errors';

import { sequelize } from '@Database';
import { dummyDataImport } from '../dev-tools/dummyData';

const startup = async () => {
  // Checks env variable AUTH0_ISSUER is set
  if (!process.env.AUTH0_ISSUER) {
    throw new Error('AUTH0_ISSUER must be defined');
  }

  // Checks env variable POSTGRES_URI is set
  if (!process.env.POSTGRES_URI) {
    throw new Error('POSTGRES_URI must be defined');
  }

  // checks if the database is reachable
  sequelize
    .authenticate()
    .then(async () => {
      console.log('Connection to database established successfully.');

      // Syncs database with models
      await sequelize.sync();
      console.log('Database synced successfully.');

      // Imports dummy data into database if ADD_DUMMY_DATA is set to true
      process.env.ADD_DUMMY_DATA === 'true' &&
        (await dummyDataImport().then(() =>
          console.log('Dummy data imported successfully.')
        ));
    })
    .catch((error) => {
      console.error('ERROR: Something went wrong with database: ', error);
    });
};

// Starts the server on port either env set PORT or 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

startup();
