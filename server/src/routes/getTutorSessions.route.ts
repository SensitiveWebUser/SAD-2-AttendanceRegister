import express from 'express';
import { param } from 'express-validator';
import { getTutorSessionsController } from '../controllers';
import { requireAuth, validateRequest } from '../middlewares';

const router = express.Router();

router.get(
  '/api/tutor/:id/sessions',
  requireAuth,
  [
    param('id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('User id must be a string'),
  ],
  validateRequest,
  getTutorSessionsController
);

export { router as getTutorSessionsRouter };
