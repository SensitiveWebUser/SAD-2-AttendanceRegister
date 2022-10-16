import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "@Errors";
import { validateRequest } from "@Middlewares";

import { User } from "@Models/users";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequestError("User with email already exists");
    }

    const user = User.build({ username, password });
    await user.save();

    // Generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    console.log("Create a new user");

    res.status(201).send(user);
  }
);

export { router as signupRouter };
