import express from 'express';
import { param } from 'express-validator';
import { getUserController } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.get(
  '/api/users/:id',
  [
    param('id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('User id must be a string'),
  ],
  validateRequest,
  getUserController
);

export { router as getUserRouter };
