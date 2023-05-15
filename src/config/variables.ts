import dotenv from 'dotenv';
dotenv.config();

export const SERVER_ENV = {
  PORT: process.env.SERVER_PORT
}