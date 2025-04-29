import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../config";

const generateToken = (
  payload: Record<string, unknown>,
  secret: string, // Ensure it's explicitly a string
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expireTime,
  } as SignOptions);
};

const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

const createPasswordResetToken = (payload: object) => {
  return jwt.sign(payload, String(config.jwt.access_secret), {
    algorithm: "HS256",
    expiresIn: config.jwt.passwordResetTokenExpirationTime,
  } as SignOptions);
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
  createPasswordResetToken,
};
