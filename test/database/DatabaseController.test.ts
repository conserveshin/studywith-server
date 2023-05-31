import DatabaseController, { QueryModel } from '../../src/database/DatabaseController';

describe("Database connection", () => {
  test("Should be able to connect to a database", async () => {
    await DatabaseController.connectDatabase();
  });
  test("Should be able to query", async () => {
    const res = await DatabaseController.query(
      {sql: 'SHOW TABLES'} as QueryModel<{}>, {}
    );
  });
  test("Should be able to close a database connection", async () => {
    await DatabaseController.closeDatabase();
  });
});


