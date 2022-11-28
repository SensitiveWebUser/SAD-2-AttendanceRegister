import express from 'express';
import multer from 'multer';
import os from 'os';
import { param } from 'express-validator';
import { requireAuth, validateRequest } from '../middlewares/index';
import getUserAsync from '../controllers/users/users.get';
import bulkImportAsync from '../controllers/users/users.bulk';

const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

/**
 * GET /api/users/:id
 *
 * Gets a user by their unique Auth0 identifier.
 */
router.get(
  '/:id',
  requireAuth,
  [param('id').isString().withMessage('User id must be a string')],
  validateRequest,
  getUserAsync
);

/**
 * POST /api/users/bulk
 *
 * Bulk import users using CSV files.
 */
router.post('/bulk', upload.single('file'), bulkImportAsync);

export default router;
