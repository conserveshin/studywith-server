import request from 'supertest';
import app from '../src/app';

describe("default behavior",() => {
  test("Should response with 'Hello_World!'", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello_World!");
  });
});


