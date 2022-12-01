import express from 'express';
import { body, param } from 'express-validator';
import { userTypeEnum } from '../utils/userTypeEnum';
import { registerAttendanceController } from '../controllers';
import { requireAuth, requireRole, validateRequest } from '../middlewares';

const router = express.Router();

router.post(
  '/api/users/:id/register/sessions/:code/attendances',
  requireAuth,
  requireRole([userTypeEnum.STUDENT, userTypeEnum.ADMIN]),
  [
    param('id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('User id must be a string'),
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
