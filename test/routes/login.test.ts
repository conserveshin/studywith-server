import bcrypt from "bcrypt";
import DatabaseController, { QueryModel } from "../../src/database/DatabaseController";
import { PASSWORD_ENCRYPTION } from "../../src/config/encryption";
import request from "supertest";
import app from "../../src/app";

describe("Login request", () => {
  const testUserInformation = {
    username: "test0",
    password: bcrypt.hashSync("test", PASSWORD_ENCRYPTION.COST_FACTOR),
    address: "test0@test.com",
    major: "TEST0"
  }
  
  beforeEach(async () => {
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
  });

  test("Should accept login", async () => {
    const response = await request(app).post("/login").send({
      username: "test0",
      password: "test",
      fcmToken: "0123456789ABCDEF"
    });
    
    expect(response.body.user.username).toBe('test0');
    expect(response.statusCode).toBe(200);
  });

  test("Should reject login with wrong username", async () => {
    const response = await request(app).post("/login").send({
      username: "test0",
      password: "nottest",
      fcmToken: "0123456789ABCDEF"
    });
    
    expect(response.statusCode).toBe(403);
  });

  test("Should reject login for wrong password", async () => {
    const response = await request(app).post("/login").send({
      username: "test0",
      password: "nottest",
      fcmToken: "0123456789ABCDEF"
    });
    
    expect(response.statusCode).toBe(403);
  });

  afterEach(async () => {
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