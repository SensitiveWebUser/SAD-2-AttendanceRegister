import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { requireAuth, validateRequest } from '@Middlewares';

import { NotFoundError } from '@Errors';

import { User as UserSchema } from '@Database';

import { User } from '@Models';

const router = express.Router();

// Get the user profile
// This route is protected by the requireAuth middleware
// The user id is passed as a parameter in the url
// Returns: the user profile if the user is found
// 404 if the user is not found
router.get(
  '/api/users/:id',
  requireAuth,
  [param('id').isString().withMessage('id must be a valid UUID')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserSchema.findByPk(id as string);
    if (!user) throw new NotFoundError("User doesn't exist");

    res.status(200).send(user);
    return new User(
      user.user_id!,
      user.user_type_id,
      user.first_name,
      user.middle_name!,
      user.last_name,
      user.email
    );
  }
);

export { router as getUserRouter };
