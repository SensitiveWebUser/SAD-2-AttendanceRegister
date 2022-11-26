import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env.local' });

import { app } from './app';
import 'express-async-errors';

import { sequelize } from '@Database';
import { dummyDataImport } from '../dev-tools/dummyData';

import { Student, Tutor, ModuleLeader } from '@Models';
import { mapUser } from '@Utils/dataMapper';

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

      //TESTING PURPOSES ONLY - REMOVE BEFORE MERGE
      const userData = {
        user_id: '2',
        first_name: 'John',
        middle_name: '2',
        last_name: 'Doe',
        email: 'JohnDoe2@localhost.com',
        user_type_id: '2',
        course_id: '1',
      };

      const tutorData = {
        user_id: '3',
        first_name: 'John',
        middle_name: '3',
        last_name: 'Doe',
        email: 'JohnDoe3@localhost.com',
        user_type_id: '3',
        course_id: null,
      };

      const moduleLeaderData = {
        user_id: '4',
        first_name: 'John',
        middle_name: '4',
        last_name: 'Doe',
        email: 'JohnDoe4@localhost.com',
        user_type_id: '4',
      };

      const tutor = new Tutor(mapUser(tutorData));

      const user = new Student(mapUser(userData));

      const moduleLeader = new ModuleLeader({
        ...mapUser(moduleLeaderData),
        moduleId: '1',
      });

      console.log("Tutor's students: ", await tutor.getStudentsAttendance());

      console.log(
        'ModuleLeader: ',
        await moduleLeader.getStudentsAttendance(
          tutor.getId(),
          moduleLeader.getModuleId()
        )
      );

      console.log(
        'User getAttendanceData',
        (await user.getAttendanceData()).data[0].session
      );
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
