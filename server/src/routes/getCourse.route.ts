//Route that imports the controller and calls the create method

import { Router } from 'express';
import { param } from 'express-validator';

import { validateRequest } from '../middlewares';
import { getCourseController } from '../controllers';

const router = Router();

router.get(
  '/api/course/:id',
  [param('id').isUUID().notEmpty().withMessage('Course id must be a UUID')],
  validateRequest,
  getCourseController
);

export { router as getCourseRouter };
