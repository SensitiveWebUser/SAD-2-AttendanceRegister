import express from 'express';
import { param } from 'express-validator';
import { getModuleController } from '../controllers';
import { requireAuth, validateRequest } from '../middlewares';

const router = express.Router();

router.get(
  '/api/module/:id',
  requireAuth,
  [
    param('id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('User id must be a string'),
  ],
  validateRequest,
  getModuleController
);

export { router as getModuleRouter };
