import express from 'express';
import { param } from 'express-validator';

import { validateRequest } from '../middlewares';
import { updateUserController } from '../controllers';

const router = express.Router();

router.patch(
  '/api/user/:id',
  [param('id').isString().withMessage('User id must be a string')],
  validateRequest,
  updateUserController
);

export { router as updateUserRouter };
