import express from 'express';
import { param } from 'express-validator';

import { validateRequest } from '../middlewares';
import { getModuleController } from '../controllers';

const router = express.Router();

router.get(
  '/api/module/:id',
  [param('id').isString().withMessage('User id must be a string')],
  validateRequest,
  getModuleController
);

export { router as getModuleRouter };
