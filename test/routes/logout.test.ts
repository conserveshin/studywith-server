import bcrypt from "bcrypt";
import DatabaseController, { QueryModel } from "../../src/database/DatabaseController";
import { PASSWORD_ENCRYPTION } from "../../src/config/encryption";
import request from "supertest";
import app from "../../src/app";
import { FindSessionInformationById } from "../../src/models/session";

describe("Logout request", () => {
  const testUserInformation = {
    username: "test0",
    password: bcrypt.hashSync("test", PASSWORD_ENCRYPTION.COST_FACTOR),
    address: "test0@test.com",
    major: "TEST0"
  }

  let sessionID: string;
  
  beforeAll(async () => {
    /* INSERT A TEST USER RECORD */
    await DatabaseController.connectDatabase();
    await DatabaseController.query(
      { 
        sql: `INSERT INTO user (username, password, address, major)
              VALUES (:username, :password, :address, :major);`
      } as QueryModel<{
        username: string,
        password: string,
        address: string,
        major: string, 
      }>,
      testUserInformation
    );

    const response = await request(app).post("/login").send({
      username: "test0",
      password: "test",
      fcmToken: "0123456789ABCDEF"
    });
    sessionID = response.body.sessionId;
  });

  test("Should be able to logout", async () => {
    await request(app).delete("/logout").set(
      {"Authorization": `Basic ${sessionID}`}
    ).expect(204);
  });

  test("Should destroy the existed session", async () => {
    const sessions = await DatabaseController.query(
      FindSessionInformationById,
      { id: sessionID }
    );
    expect(sessions.length).toBe(0);
  });

  afterAll(async () => {
    await DatabaseController.query(
      { 
        sql: `DELETE FROM user
              WHERE username=:username;`
      } as QueryModel<{
        username: string
      }>,
      { username: testUserInformation.username }
    );
    
    await DatabaseController.closeDatabase();
  });
});