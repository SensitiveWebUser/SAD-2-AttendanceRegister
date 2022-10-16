import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  function signup(): Promise<string[]>;
}

let mongod: any;

beforeAll(async () => {
  process.env.JWT_KEY = "ABC";

  mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongod.stop();
  await mongoose.connection.close();
});

global.signup = async () => {
  const username = "testUsername";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      username,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
