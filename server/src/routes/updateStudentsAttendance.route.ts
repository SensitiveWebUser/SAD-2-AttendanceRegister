import express from 'express';
import { body, param } from 'express-validator';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import { updateStudentsAttendanceController } from '../controllers';
import { requireAuth, requireRole, validateRequest } from '../middlewares';

const router = express.Router();

router.patch(
  '/api/user/:id/sessions/:sessionId/attendances',
  requireAuth,
  requireRole([
    userTypeEnum.ADMIN,
    userTypeEnum.TUTOR,
    userTypeEnum.COURSE_LEADER,
    userTypeEnum.MODULE_LEADER,
  ]),
  [
    param('id').isString().notEmpty().withMessage('User id must be a string'),
    param('sessionId')
      .isUUID()
      .trim()
      .notEmpty()
      .withMessage('Session id must be a UUID'),
    body('date')
      .isISO8601()
      .notEmpty()
      .toDate()
      .withMessage('Date must be a valid ISO 8601 date'),
  ],
  validateRequest,
  updateStudentsAttendanceController
);

export { router as updateStudentsAttendanceRouter };
