import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import express from "express";
import { Server } from "http";
import userRouter from "../src/routes/user.router";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

describe("User Controller", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(4001, () => {
      console.log("Test server running on port 4001");
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should return 400 when creating a user without required fields", async () => {
    const res = await request(app).post("/users").send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 201 when creating a user with valid data", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com", name: "Test User" });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe("test@example.com");
  });
});
