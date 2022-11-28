import type { Request, Response } from 'express';
import debug from 'debug';
import { parse } from 'csv-parse';
import fs from 'fs';
import { Course } from '../../database';

const logger = debug('backend:courses-controller-bulk');

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
  parse(data, { columns: true }, async (err, records) => {
    if (err) {
      logger('unable to parse the CSV file.');
      console.error(err);
      return res.status(500).end();
    }

    // send bulk import command to DB
    logger(`creating courses ${JSON.stringify(records)}`);
    try {
      await Course.bulkCreate([...records], { validate: true });
      logger('created courses successfully');
      res.status(200).end();
    } catch (err) {
      logger('unable to create courses');
      console.log(err);
      res.status(500).end();
    }
  });
}
