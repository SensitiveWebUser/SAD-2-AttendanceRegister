import express from 'express';
import { param } from 'express-validator';
import { getUserCoursesController } from '../controllers';
import { requireAuth, validateRequest } from '../middlewares';

const router = express.Router();

const idCheckMiddleware = param('id')
  .isString()
  .trim()
  .notEmpty()
  .withMessage('User id must be a string');

router.get(
  '/api/users/:id/courses',
  //requireAuth,
  idCheckMiddleware,
  validateRequest,
  getUserCoursesController
);

export { router as getUserCoursesRouter };
