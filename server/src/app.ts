import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from '@Routes/currentUser';
import { signinRouter } from '@Routes/signin';
import { signoutRouter } from '@Routes/signout';
import { signupRouter } from '@Routes/signup';

import { NotFoundError } from '@Errors';
import { errorHandler } from '@Middlewares';

const app = express();
app.set('trust proxy', true);

// Middlewares
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

//routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//404
app.all('*', async () => {
  throw new NotFoundError();
});

//Error handler
app.use(errorHandler);

export { app };
