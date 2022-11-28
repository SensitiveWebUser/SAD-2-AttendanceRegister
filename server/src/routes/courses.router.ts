import express from 'express';
import os from 'os';
import multer from 'multer';
import { param, query } from 'express-validator';
import getCourseAsync from '../controllers/courses/courses.get';
import deleteCourseAsync from '../controllers/courses/courses.delete';
import createCourseAsync from '../controllers/courses/courses.create';
import updateCourseAsync from '../controllers/courses/courses.update';
import bulkImportAsync from '../controllers/courses/courses.bulk';

const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

/**
 * POST /api/courses?name=hi&courseLeader=auth0|123
 *
 * Creates a new course using a name and their course leader.
 */
router.post(
  '/',
  [query('name').isString().withMessage('Name must be a string')],
  [query('courseLeader').isUUID().withMessage('Course leader must be a UUID')],
  createCourseAsync
);

/**
 * POST /api/courses/bulk
 *
 * Bulk import courses using CSV files.
 */
router.post('/bulk', upload.single('file'), bulkImportAsync);

/**
 * GET /api/courses/:id
 *
 * Gets a course by their unique identifier.
 */
router.get(
  '/:id',
  [param('id').isString().withMessage('Course id must be a string')],
  getCourseAsync
);

/**
 * PATCH /api/courses/:id/?name=hi&courseLeader=auth0|123
 *
 * Updates a course in the database by using OPTIONAL parameters.
 */
router.patch('/:id', updateCourseAsync);

/**
 * DELETE /api/courses/:id
 *
 * Deletes a course by their unique identifier.
 */
router.delete(
  '/:id',
  [param('id').isString().withMessage('Course id must be a string')],
  deleteCourseAsync
);

export default router;
