import dotenv from 'dotenv';
import path from 'path';

let filename = ".env";
if (process.env.NODE_ENV === "development") filename = ".env.development";
else if (process.env.NODE_ENV === "test") filename = ".env.test";

dotenv.config({
  path: path.resolve(process.cwd(), filename)
});

export const NODE_ENV = process.env.NODE_ENV;

export const SERVER_ENV = {
  PORT: process.env.SERVER_PORT
}