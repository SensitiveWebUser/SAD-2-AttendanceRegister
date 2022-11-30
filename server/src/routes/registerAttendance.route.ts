import express from 'express';
import { body, param } from 'express-validator';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import { registerAttendanceController } from '../controllers';
import { requireAuth, requireRole, validateRequest } from '../middlewares';

const router = express.Router();

router.post(
  '/api/users/:id/register/sessions/:sessionId/attendances',
  requireAuth,
  requireRole([userTypeEnum.STUDENT, userTypeEnum.ADMIN]),
  [
    param('id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('User id must be a string'),
    param('sessionId')
      .isUUID()
      .trim()
      .notEmpty()
      .withMessage('Session id must be a UUID'),
    body('code')
      .isString()
      .notEmpty()
      .isLength({ min: 4, max: 4 })
      .withMessage('Code must be a string of 4 characters'),
  ],
  validateRequest,
  registerAttendanceController
);

export { router as registerAttendanceRouter };
