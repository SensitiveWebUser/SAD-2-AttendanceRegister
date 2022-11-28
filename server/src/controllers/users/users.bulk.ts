import type { Request, Response } from 'express';
import debug from 'debug';
import { parse } from 'csv-parse';
import fs from 'fs';
import managementClient from 'src/utils/managementClient';

const logger = debug('backend:users-controller');

const connectionId = process.env.AUTH0_DATABASE_IDENTIFIER;

type TypeCSV = {
  email: string;
};

type AuthUsers = {
  email: string;
  email_verified: boolean;
};

export default async function bulkImportAsync(req: Request, res: Response) {
  const file = req.file;

  // ensure a file was uploaded
  if (file === undefined) {
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
    const users: AuthUsers[] = records.map((record) => {
      return { email: record.email, email_verified: true };
    });
    const jsonUsers = JSON.stringify(users);

    // send bulk import job command to auth0
    logger(`sending import job to auth0... ${jsonUsers}`);
    const result = await managementClient.importUsersJob({
      connection_id: connectionId || '',
      users_json: jsonUsers,
    });
    logger('sent import job to auth0 successfully');

    return res.status(200).json(result);
  });
}
