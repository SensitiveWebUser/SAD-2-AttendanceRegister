import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import debug from 'debug';
import { parse } from 'csv-parse';
import fs from 'fs';
import managementClient from '../../utils/managementClient';

const logger = debug('backend:users-controller');

const connectionId = process.env.AUTH0_DATABASE_IDENTIFIER;

type TypeCSV = {
  email: string;
  password: string;
  role: string;
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

export default async function bulkImportAsync(req: Request, res: Response) {
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
      console.error(err);
      return res.status(500).end();
    }

    // convert CSV into format Auth0 can understand
    const users = await getAuth0FormatAsync(records);
    const jsonUsers = JSON.stringify(users);

    // send bulk import job command to auth0
    logger(`sending import job to auth0... ${jsonUsers}`);
    const result = await managementClient.importUsersJob({
      connection_id: connectionId || '',
      users_json: jsonUsers,
    });
    logger(
      'sent import job to auth0 successfully...this will take time to populate'
    );

    return res.status(200).json(result);
  });
}
