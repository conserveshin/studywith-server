import request from 'supertest';
import app from '../app';

describe("default behavior",() => {
  test("Should response with 404", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});


