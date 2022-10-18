import mongoose from "mongoose";

import { Password } from "@Utils/password";

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  username: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
}

// Define user model
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Hide password and sets _id to id before returning user
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret.password;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

// Hash password before saving
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// Build user model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
