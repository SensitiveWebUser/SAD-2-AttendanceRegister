import { Router } from 'express';
import { body } from 'express-validator';
import { createUserController } from '../controllers';
import { validateRequest } from '../middlewares';

const router = Router();

router.post(
  '/api/user',
  [
    body('firstName')
      .isString()
      .isLength({ min: 1, max: 20 })
      .notEmpty()
      .withMessage('First name must be a string of 20 characters or less'),
    body('middleName')
      .isString()
      .isLength({ max: 20 })
      .withMessage('Middle name must be a string of 20 characters or less'),
    body('lastName')
      .isString()
      .isLength({ min: 1, max: 20 })
      .notEmpty()
      .withMessage('Last name must be a string of 20 characters or less'),
    body('email')
      .isEmail()
      .notEmpty()
      .withMessage('Email must be a valid email'),
    body('password')
      .isString()
      .isLength({ min: 8, max: 20 })
      .notEmpty()
      .withMessage('Password must be a string of 8 to 20 characters'),
    body('type').isUUID().notEmpty().withMessage('Type must be a UUID'),
  ],
  validateRequest,
  createUserController
);

export { router as createUserRouter };
