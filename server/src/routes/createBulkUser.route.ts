import express from 'express';
import multer from 'multer';
import os from 'os';
import { requireAuth, requireRole } from 'src/middlewares';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import { bulkImportUsersAsync } from '../controllers';

const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

router.post(
  '/api/users/bulk',
  requireAuth,
  requireRole([userTypeEnum.ADMIN, userTypeEnum.COURSE_LEADER]),
  upload.single('file'),
  bulkImportUsersAsync
);

export { router as createBulkUserRouter };
