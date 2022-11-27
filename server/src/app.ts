import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import debug from 'debug';
import 'express-async-errors';
import { json } from 'body-parser';
import { NotFoundError } from '@Errors';
import { errorHandler } from '@Middlewares';
import { getUserRouter } from '@Routes/index';

const logger = debug('backend:request');
const app = express();

// cors rules
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// application middleware
app.use(helmet());
app.use(morgan('tiny', { stream: { write: (msg) => logger(msg) } }));
app.use(json());

// express routes
app.use(getUserRouter);

// 404 handler
app.all('*', async () => {
  throw new NotFoundError();
});

// generic error handler
app.use(errorHandler);

export { app };
