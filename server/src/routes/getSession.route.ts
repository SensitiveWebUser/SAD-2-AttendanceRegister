import express from 'express';
import { param } from 'express-validator';

import { validateRequest } from '../middlewares';
import { getSessionController } from '../controllers';

const router = express.Router();

router.get(
  '/api/session/:id',
  [param('id').isUUID().withMessage('User id must be a UUID')],
  validateRequest,
  getSessionController
);

export { router as getSessionRouter };
