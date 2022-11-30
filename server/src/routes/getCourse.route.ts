import { Router } from 'express';
import { param } from 'express-validator';
import { getCourseController } from '../controllers';
import { requireAuth, validateRequest } from '../middlewares';

const router = Router();

router.get(
  '/api/course/:id',
  requireAuth,
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
