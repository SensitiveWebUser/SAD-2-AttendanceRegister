import { Router } from 'express';
import { param } from 'express-validator';
import { getCourseController } from '../controllers';
import { validateRequest } from '../middlewares';

const router = Router();

router.get(
  '/api/course/:id',
  [
    param('id')
      .isUUID()
      .trim()
      .notEmpty()
      .withMessage('Course id must be a UUID'),
  ],
  validateRequest,
  getCourseController
);

export { router as getCourseRouter };
