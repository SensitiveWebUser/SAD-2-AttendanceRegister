import express from 'express';
import { param } from 'express-validator';
import { getSessionController } from '../controllers';
import { requireAuth, validateRequest } from '../middlewares';

const router = express.Router();

router.get(
  '/api/session/:id',
  requireAuth,
  [
    param('id')
      .isUUID()
      .trim()
      .notEmpty()
      .withMessage('User id must be a UUID'),
  ],
  validateRequest,
  getSessionController
);

export { router as getSessionRouter };
