import type { Request, Response } from 'express';
import { parse } from 'csv-parse';
import fs from 'fs';
import debug from 'debug';
import { NotFoundError } from '../errors';
import { User, User as UserSchema } from '../database';
import { User as UserModel } from '../models';
import managementClient from '../utils/managementClient';

const connectionId = process.env.AUTH0_DATABASE_IDENTIFIER;

const logger = debug('backend:users-controller');

async function getUserAsync(req: Request, res: Response) {
  const { id } = req.params;

  const user = await UserSchema.findByPk(id);

  if (!user) {
    logger('user does not exist.');
    throw new NotFoundError();
  }

  logger(`user id ${id} exists and was returned.`);
  res
    .status(200)
    .json(
      new UserModel(
        user.user_id as string,
        user.user_type_id,
        user.first_name,
        user.middle_name as string,
        user.last_name,
        user.email
      ).toJson()
    );
}

type TypeCSV = {
  email: string;
};

type AuthUsers = {
  email: string;
  email_verified: boolean;
};

async function bulkImportAsync(req: Request, res: Response) {
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

export default { getUserAsync, bulkImportAsync };
