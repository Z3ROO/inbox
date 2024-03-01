import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'
});
