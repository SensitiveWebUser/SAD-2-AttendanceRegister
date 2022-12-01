import express from 'express';
import multer from 'multer';
import os from 'os';
import { bulkImportModulesAsync } from '../controllers';
import { requireAuth } from '../middlewares';

const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

router.post(
  '/api/modules/bulk',
  requireAuth,
  upload.single('file'),
  bulkImportModulesAsync
);

export { router as createBulkModulesRouter };
