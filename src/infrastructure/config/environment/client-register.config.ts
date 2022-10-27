import { registerAs } from '@nestjs/config';

export default registerAs('client', () => ({
  auth: {
    host: process.env.AUTH_CLIENT_HOST,
    port: process.env.AUTH_CLIENT_PORT
  }
}));
