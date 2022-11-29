import express from 'express';
import multer from 'multer';
import os from 'os';
import { bulkImportAsync } from '../controllers';

const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

router.post('/api/import/bulk', upload.single('file'), bulkImportAsync);

export { router as createBulkUserRouter };
