import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "@Errors";
import { validateRequest } from "@Middlewares";

import { Password } from "@Utils/password";

import { User } from "@Models/users";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
