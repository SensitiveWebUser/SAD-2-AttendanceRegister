import express from 'express';
import { body, param } from 'express-validator';
import { updateUserController } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();
router.patch(
  '/api/user/:id',
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
    body('typeId').isUUID().withMessage('Type id must be a UUID'),
  ],
  validateRequest,
  updateUserController
);

export { router as updateUserRouter };
