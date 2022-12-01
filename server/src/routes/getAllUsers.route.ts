import { Router } from 'express';
import { userTypeEnum } from '../utils/userTypeEnum';
import { getAllUsersController } from '../controllers';
import { requireAuth, requireRole, validateRequest } from '../middlewares';

const router = Router();

router.get(
  '/api/users',
  requireAuth,
  requireRole([userTypeEnum.ADMIN]),
  validateRequest,
  getAllUsersController
);

export { router as getAllUsersRouter };
