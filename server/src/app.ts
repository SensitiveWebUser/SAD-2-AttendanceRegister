import { json } from 'body-parser';
import debug from 'debug';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import { NotFoundError } from '../src/errors';
import { errorHandler } from '../src/middlewares';
import cors from 'cors';

import {
  createBulkUserRouter,
  createUserRouter,
  getCourseRouter,
  getModuleRouter,
  getSessionRouter,
  getTutorSessionsRouter,
  getUserAttendanceRouter,
  getUserModuleAttendanceRouter,
  getUserRouter,
  getAllUsersRouter,
  registerAttendanceRouter,
  resetPasswordUserRouter,
  updateStudentsAttendanceRouter,
  updateUserRouter,
  createBulkModulesRouter,
} from './routes';

const logger = debug('backend:request');
const app = express();

// cors rules
app.use(cors());

// application middleware
app.use(helmet());
app.use(morgan('tiny', { stream: { write: (msg) => logger(msg) } }));
app.use(json());

// express routes

// get routes
app.use(getUserRouter);
app.use(getCourseRouter);
app.use(getModuleRouter);
app.use(getSessionRouter);
app.use(getUserModuleAttendanceRouter);
app.use(getUserAttendanceRouter);
app.use(getTutorSessionsRouter);
app.use(getAllUsersRouter);

// create routes
app.use(createUserRouter);
app.use(createBulkUserRouter);
app.use(createBulkModulesRouter);

// update routes
app.use(updateUserRouter);
app.use(registerAttendanceRouter);

// custom routes
app.use(resetPasswordUserRouter);
app.use(updateStudentsAttendanceRouter);

// 404 handler
app.all('*', async () => {
  throw new NotFoundError();
});

// generic error handler
app.use(errorHandler);

// 404 handler
app.all('*', async (req: Request, res: Response) => {
  logger(`route ${req.url} does not exist. `);
  res.status(404).json({ error: 'route does not exist' });
});

export { app };
