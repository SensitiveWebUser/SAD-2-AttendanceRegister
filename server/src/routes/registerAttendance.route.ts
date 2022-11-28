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
    body('code')
      .isString()
      .notEmpty()
      .isLength({ min: 4, max: 4 })
      .withMessage('Code must be a string of 4 characters'),
  ],
  validateRequest,
  updateAttendanceController
);

export { router as registerAttendanceRouter };
