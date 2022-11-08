import express, { Request, Response } from 'express';
import { query } from 'express-validator';
import { requireAuth, validateRequest } from '@Middlewares';

import { NotFoundError } from '@Errors';

import { User } from '@Models/users';

const router = express.Router();

// Get the user profile
// This route is protected by the requireAuth middleware
// Query parameters: user_id (UUID)
// Returns: the user profile
router.get(
  '/api/users',
  requireAuth,
  [query(['user_id']).isUUID(4).withMessage('user_id must be a valid UUID')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(req.headers);

    const { user_id } = req.query;

    const user = await User.findById(user_id);

    if (!user) {
      console.log('User not found');

      throw new NotFoundError("User doesn't exist");
    }

    res.status(200).send(user);
  }
);

export { router as getUserRouter };
