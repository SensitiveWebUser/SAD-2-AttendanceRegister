import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env.local' });

import debug from 'debug';
import { app } from './app';
import 'express-async-errors';
import { sequelize } from '@Database';
import seedAsync from '../dev-tools/seed';

const logger = debug('backend:startup');

sequelize
  .authenticate()
  .then(async () => await sequelize.sync())
  .then(seedAsync)
  .catch((error) => {
    logger('an error occured whilst setting up the database');
    throw error;
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger(`listening on port ${port}!`);
});
