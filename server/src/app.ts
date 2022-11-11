import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { NotFoundError } from '@Errors';
import { errorHandler } from '@Middlewares';

// Routes imports
import { getUserRouter } from '@Routes/getUser';

const app = express();

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Middlewares
app.use(json());

//Routes
app.use(getUserRouter);

//404
app.all('*', async () => {
  throw new NotFoundError();
});

//Error handler
app.use(errorHandler);

export { app };
