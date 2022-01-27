import { config, } from 'dotenv';

config();

export default {
  dbLink: process.env.DB_LINK,
  auth: {
    jwt: {
      access: {
        secret: process.env.JWT_ACCESS_SECRET,
        lifetime: Number(process.env.JWT_ACCESS_LIFETIME),
      },
    },
  },
  server: {
    port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
    host: process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost',
    shutdownTimeout: process.env.SERVER_SHUTDOWN_TIMEOUT
      ? Number(process.env.SERVER_SHUTDOWN_TIMEOUT)
      : 15000,
  },
};
