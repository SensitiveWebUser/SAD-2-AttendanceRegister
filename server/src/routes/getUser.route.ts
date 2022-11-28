import express from 'express';
import { param } from 'express-validator';

import { validateRequest } from '../middlewares';
import { getUserController } from '../controllers';

const router = express.Router();

router.get(
  '/api/users/:id',
  [param('id').isString().withMessage('User id must be a string')],
  validateRequest,
  getUserController
);

export { router as getUserRouter };
