import { app } from "./app";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env.local" });

import "express-async-errors";
import mongoose from "mongoose";

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

startup();
