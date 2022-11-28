import express from 'express';
import { param, body } from 'express-validator';

import { validateRequest } from '../middlewares';
import { resetPasswordController } from '../controllers';

const router = express.Router();

router.post(
  '/api/user/:id/reset/password',
  [
    param('id').isString().withMessage('User id must be a string'),
    body('password').isString().withMessage('Password must be a string'),
  ],
  validateRequest,
  resetPasswordController
);

export { router as resetPasswordRouter };
