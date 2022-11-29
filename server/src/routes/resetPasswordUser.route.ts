import express from 'express';
import { body, param } from 'express-validator';
import { resetPasswordController } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.patch(
  '/api/user/:id/reset/password',
  [
    param('id').isString().withMessage('User id must be a string'),
    body('password')
      .isString()
      .trim()
      .notEmpty()
      .isLength({ min: 8 })
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .withMessage(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
  ],
  validateRequest,
  resetPasswordController
);

export { router as resetPasswordUserRouter };
