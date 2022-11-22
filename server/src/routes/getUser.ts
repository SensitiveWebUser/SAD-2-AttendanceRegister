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
  [param('id').isNumeric().withMessage('User id must be a number')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // Get the user from the database
    const user = await UserSchema.findByPk(id);

    // If the user is not found, throw a 404 error
    if (!user) {
      throw new NotFoundError();
    }

    // Return json data of the user
    res
      .status(200)
      .json(
        new User(
          user.user_id as number,
          user.user_type_id,
          user.first_name,
          user.middle_name as string,
          user.last_name,
          user.email
        ).toJson()
      );
  }
);

export { router as getUserRouter };
