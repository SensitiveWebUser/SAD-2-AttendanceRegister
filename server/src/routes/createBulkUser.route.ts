import express from 'express';
import multer from 'multer';
import os from 'os';
import { bulkImportUsersAsync } from '../controllers';

const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

router.post('/api/users/bulk', upload.single('file'), bulkImportUsersAsync);

export { router as createBulkUserRouter };
