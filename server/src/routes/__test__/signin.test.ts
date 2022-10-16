import request from "supertest";
import { app } from "../../app";

const USERNAME = "testUsername";
const PASSWORD = "password";

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      username: USERNAME,
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with missing username and password", async () => {
  await request(app).post("/api/users/signin").send({}).expect(400);
});

it("fails if username doesn't exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: "testUsername2",
      password: PASSWORD,
    })
    .expect(400);
});
