import express from 'express';
import { param } from 'express-validator';
import { requireAuth, validateRequest } from '@Middlewares';

import { getUserController } from '@Controllers';

const router = express.Router();

// Get the user profile
// This route is protected by the requireAuth middleware
// The user id is passed as a parameter in the url
// Returns: the user profile if the user is found
// 404 if the user is not found
router.get(
  '/api/user/:id',
  requireAuth,
  [param('id').isString().withMessage('User id must be a string')],
  validateRequest,
  getUserController
);

export { router as getUserRouter };
