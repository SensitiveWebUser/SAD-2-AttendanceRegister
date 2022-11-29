import express from 'express';
import { param } from 'express-validator';
import { getTutorSessionsController } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.get(
  '/api/tutor/:id/sessions',
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
