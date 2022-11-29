import { Router } from 'express';
import { getAllUsersController } from '../controllers';
import { validateRequest } from '../middlewares';

const router = Router();

router.get('/api/users', validateRequest, getAllUsersController);

export { router as getAllUsersRouter };
