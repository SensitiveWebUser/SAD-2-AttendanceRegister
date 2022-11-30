import express from 'express';
import { param } from 'express-validator';
import { getUserModuleAttendanceController } from '../controllers';
import { requireAuth, validateRequest } from '../middlewares';

const router = express.Router();

router.get(
  '/api/users/:id/modules/:moduleId/attendances',
  requireAuth,
  [
    param('id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('User id must be a string'),
    param('moduleId')
      .isUUID()
      .trim()
      .notEmpty()
      .withMessage('Module id must be a UUID'),
  ],
  validateRequest,
  getUserModuleAttendanceController
);

export { router as getUserModuleAttendanceRouter };
