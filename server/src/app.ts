import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import debug from 'debug';
import 'express-async-errors';
import { json } from 'body-parser';
import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/users.router';
import courseRouter from './routes/courses.router';

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
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);

// generic error handler
app.use(errorHandler);

// 404 handler
app.all('*', async (req: Request, res: Response) => {
  logger(`route ${req.url} does not exist. `);
  res.status(404).json({ error: 'route does not exist' });
});

export { app };
