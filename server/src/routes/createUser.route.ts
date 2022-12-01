import { Router } from 'express';
import { body } from 'express-validator';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import { createUserController } from '../controllers';
import { requireAuth, requireRole, validateRequest } from '../middlewares';

const router = Router();

router.post(
  '/api/users',
  //  requireAuth,
  //  requireRole([userTypeEnum.ADMIN]),
  [
    body('firstName')
      .isString()
      .trim()
      .isLength({ min: 1, max: 20 })
      .notEmpty()
      .withMessage('First name must be a string of 20 characters or less'),
    body('middleName')
      .isString()
      .trim()
      .isLength({ max: 20 })
      .withMessage('Middle name must be a string of 20 characters or less'),
    body('lastName')
      .isString()
      .trim()
      .isLength({ min: 1, max: 20 })
      .notEmpty()
      .withMessage('Last name must be a string of 20 characters or less'),
    body('email')
      .isEmail()
      .notEmpty()
      .withMessage('Email must be a valid email'),
    body('sessionIds')
      .isArray()
      .notEmpty()
      .withMessage('SessionIds must be an array'),
    body('academicAdvisorId')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Academic advisor id must be a string'),
  ],
  validateRequest,
  createUserController
);

export { router as createUserRouter };
