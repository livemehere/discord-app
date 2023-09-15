import * as dotenv from 'dotenv';
import * as path from 'path';

const envData = dotenv.config({
  path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`),
}).parsed;

export const config = {
  PORT: envData.PORT,
  DATABASE_URL: envData.DATABASE_URL,
  REDIS_HOST: envData.REDIS_HOST,
  REDIS_PORT: envData.REDIS_PORT,
};
