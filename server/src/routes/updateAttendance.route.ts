import express from 'express';
import { param, body } from 'express-validator';

import { validateRequest } from '../middlewares';
import { updateAttendanceController } from '../controllers';

const router = express.Router();

router.post(
  '/api/user/:id/session/:sessionId/attendance',
  [
    param('id').isString().notEmpty().withMessage('User id must be a string'),
    param('sessionId')
      .isUUID()
      .notEmpty()
      .withMessage('Session id must be a UUID'),
    body('date').isDate().notEmpty().withMessage('Date must be a date'),
  ],
  validateRequest,
  updateAttendanceController
);

export { router as updateAttendanceRouter };
