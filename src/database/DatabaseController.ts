import mysql, { OkPacket, RowDataPacket } from 'mysql2/promise';
import { DATABASE_ENV } from '../config/environment';
import { DatabaseConnectionFailedError } from '../types/errors';

let pool: mysql.Pool | undefined = undefined;

const connectDatabase = async () => {
  try {
    pool = await mysql.createPool({
      host: DATABASE_ENV.HOST,
      port: DATABASE_ENV.PORT,
      user: DATABASE_ENV.USER,
      password: DATABASE_ENV.PASSWORD,
      database: DATABASE_ENV.DATABASE,
      connectionLimit: DATABASE_ENV.CONNECTION_LIMIT,
      namedPlaceholders: true
    })
  } catch(error: unknown) {
    throw new DatabaseConnectionFailedError("Database Connection Failed");
  }
};

const closeDatabase = async () => {
  await pool?.end();
  pool = undefined;
};

export type QueryModel<
  T extends Object, R extends RowDataPacket | OkPacket = OkPacket
> = { sql: string };


const query = async <
  T extends Object, R extends RowDataPacket | OkPacket = OkPacket
> (
  model: QueryModel<T, R>,
  args: T
) => {
  if (pool === undefined) {
    throw new DatabaseConnectionFailedError("Database Connection Closed");
  }

  const [rows] = await pool.execute<
    R extends RowDataPacket ? R[] : R
  >(model.sql, args);
  return rows;
};


const transact = async (
  transaction: (
    query: <T extends Object, R extends RowDataPacket | OkPacket = OkPacket>(
      model: QueryModel<T, R>, args: T
    ) => Promise<R extends RowDataPacket ? R[] : R>
  ) => Promise<void>
) => {
  if (pool === undefined) {
    throw new DatabaseConnectionFailedError("Database Connection Closed");
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await transaction(
      async <T extends Object, R extends RowDataPacket | OkPacket = OkPacket>(
        model: QueryModel<T, R>, args: T
      ) => {
        const [rows] = await connection.execute<
          R extends RowDataPacket ? R[] : R
        >(model.sql, args);
        return rows;
      }
    );
    connection.commit();
  } catch(error: unknown) {
    connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const DatabaseController = { connectDatabase, closeDatabase, query, transact };
export default DatabaseController;