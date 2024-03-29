import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,

  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
  },
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
