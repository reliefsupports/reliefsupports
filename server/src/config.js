import bcrypt from 'bcrypt';

require('dotenv').config();

const mongoHost =
  process.env.NODE_ENV === 'production' ? 'mongo' : process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
export const mongoDB = process.env.MONGO_DB;
export const mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${mongoDB}`;

export const port = process.env.PORT || 5000;
export const jwtSecret = process.env.JWT_SECRET;

const saltRounds = 10;
export const salt = bcrypt.genSaltSync(saltRounds);
