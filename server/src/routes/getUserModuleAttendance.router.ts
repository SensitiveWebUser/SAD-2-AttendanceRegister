import express from 'express';
import { param } from 'express-validator';

import { validateRequest } from '../middlewares';
import { getUserModuleAttendanceController } from '../controllers';

const router = express.Router();

router.get(
  '/api/user/:id/module/:moduleId/attendances',
  [
    param('id').isString().withMessage('User id must be a string'),
    param('moduleId').isUUID().withMessage('Module id must be a UUID'),
  ],
  validateRequest,
  getUserModuleAttendanceController
);

export { router as getUserModuleAttendance };
