import { Router } from 'express';
import { param } from 'express-validator';
import { userTypeEnum } from '../utils/userTypeEnum';
import { deleteAdvisorController } from '../controllers';
import { requireAuth, requireRole, validateRequest } from '../middlewares';

const router = Router();

router.delete(
  '/api/users/:id',
  [
    param('id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('User id must be a string'),
  ],
  validateRequest,
  deleteAdvisorController
);

export { router as deleteAdvisorRouter };
