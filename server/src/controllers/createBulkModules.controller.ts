import type { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Module, ModuleCourseLink } from '../database';
import { parse } from 'csv-parse';
import debug from 'debug';
import fs from 'fs';

const logger = debug('backend:modules-controller');

type TypeCSV = {
  module_id: string;
  module_name: string;
  module_leader_id: string;
  course_id: string;
};

type LinkListType = {
  module_id: string;
  course_id: string;
};

export const bulkImportModulesAsync = (req: Request, res: Response) => {
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

    // add generated id's to all records
    records.forEach((record) => (record.module_id = uuidv4()));

    // generate link table
    const linkList: LinkListType[] = records.map((record) => {
      return { module_id: record.module_id, course_id: record.course_id };
    });

    // bulk import modules
    const jsonModules = JSON.stringify(records);
    logger(`adding modules to database... ${jsonModules}`);
    await Module.bulkCreate([...records], { validate: true });

    logger(`adding links to database... ${jsonModules}`);
    await ModuleCourseLink.bulkCreate([...linkList], { validate: true });
    logger('imported successfully!');

    return res.status(200).end();
  });
};
