import type { Request, Response } from 'express';
import { User, UserType } from '../database';
import bcrypt from 'bcrypt';
import { parse } from 'csv-parse';
import debug from 'debug';
import fs from 'fs';
import managementClient from '../utils/managementClient';

const logger = debug('backend:users-controller');

const connectionId = process.env.AUTH0_DATABASE_IDENTIFIER;

type TypeCSV = {
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  password: string;
  role: string;
};

type DatabaseUser = {
  user_id: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  user_type_id: string;
};

type AuthUsers = {
  email: string;
  email_verified: boolean;
  custom_password_hash: {
    algorithm: string;
    hash: {
      value: string;
    };
  };
  app_metadata: {
    role: string;
  };
};

async function getAuth0FormatAsync(records: TypeCSV[]): Promise<AuthUsers[]> {
  const saltRounds = 10;

  // salt passwords using bcrypt and return list of users with salted passwords
  const users = await Promise.all(
    records.map(async (record) => {
      const hash = await bcrypt.hash(record.password, saltRounds);

      return {
        email: record.email,
        email_verified: true,
        app_metadata: {
          role: record.role,
        },
        custom_password_hash: {
          algorithm: 'bcrypt',
          hash: {
            value: hash,
          },
        },
      };
    })
  );

  return users;
}

export const bulkImportUsersAsync = (req: Request, res: Response) => {
  const file = req.file;

  // ensure a file was uploaded
  if (file === undefined) {
    logger('a file was not included in the request');
    res.status(500).end();
    return;
  }

  // read the file
  const data = fs.readFileSync(file.path);
  parse(data, { columns: true }, async (err, records: TypeCSV[]) => {
    if (err) {
      logger('unable to parse the CSV file.');
      logger(err);
      return res.status(500).end();
    }

    const job = await uploadToAuth0(records);
    await waitForAuth0JobSuccessAsync(job.id);
    await uploadToDatabase(records);

    return res.status(200).end();
  });
};

async function waitForAuth0JobSuccessAsync(jobId: string) {
  let doRun = true;
  do {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const job = await managementClient.getJob({ id: jobId });
    if (job.status === 'completed') {
      logger(`auth0 job id ${jobId} completed!`);
      logger(job);
      doRun = false;
    } else {
      logger(`auth0 job id ${jobId} has not yet completed... waiting...`);
    }
  } while (doRun);
}

async function uploadToDatabase(records: TypeCSV[]) {
  const dbUsers: DatabaseUser[] = await Promise.all(
    records.map(async (record) => {
      // get the user type for that user
      const userTypeId = await UserType.findOne({
        where: { user_type_name: record.role },
      });

      // get user
      const users = await managementClient.getUsersByEmail(record.email);

      if (users.length !== 0) {
        logger(`user with email ${record.email} was found`);
      }

      // create a new object for the database
      return {
        user_id: users[0].user_id as string,
        first_name: record.first_name,
        middle_name: record.middle_name,
        last_name: record.last_name,
        email: record.email,
        user_type_id: userTypeId?.user_type_id as string,
      };
    })
  );

  logger('importing users to database...');
  try {
    await User.bulkCreate([...dbUsers], { validate: true });
    logger('added all users successfully.');
  } catch (err) {
    logger('users could not be added to the database successfully.');
    logger(err);
  }
}

async function uploadToAuth0(records: TypeCSV[]) {
  const users = await getAuth0FormatAsync(records);
  const jsonUsers = JSON.stringify(users);

  // send bulk import job command to auth0
  logger('sending import job to auth0...');
  const result = await managementClient.importUsersJob({
    connection_id: connectionId || '',
    users_json: jsonUsers,
  });

  return result;
}
