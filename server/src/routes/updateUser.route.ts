import express from 'express';
import { body, param } from 'express-validator';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import { updateUserController } from '../controllers';
import { requireAuth, requireRole, validateRequest } from '../middlewares';

const router = express.Router();
router.patch(
  '/api/users/:id',
  requireAuth,
  requireRole([userTypeEnum.ADMIN]),
  [
    param('id').isString().withMessage('User id must be a string'),
    body('firstName')
      .isString()
      .trim()
      .isLength({ max: 20, min: 1 })
      .withMessage('First name must be between 1 and 20 characters'),
    body('middleName')
      .isString()
      .trim()
      .isLength({ max: 20 })
      .withMessage('Middle name must be a string of 20 characters or less'),
    body('lastName')
      .isString()
      .trim()
      .isLength({ max: 20, min: 1 })
      .withMessage('Last name must be between 1 and 20 characters'),
    body('email')
      .isEmail()
      .trim()
      .isLength({ max: 20, min: 1 })
      .withMessage('Email must be between 1 and 20 characters'),
    body('type')
      .isString()
      .trim()
      .isLength({ max: 20, min: 1 })
      .withMessage('User type must be a string'),
  ],
  validateRequest,
  updateUserController
);

export { router as updateUserRouter };
