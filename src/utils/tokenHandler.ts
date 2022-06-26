import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "../config/constant";
import TokenType from "../types/tokenType";

export const createJWTToken = (
  payload: TokenType,
  type: "access" | "refresh",
  expiry?: string
) => {
  const secret: string =
    type === "access" ? JWT_ACCESS_TOKEN : JWT_REFRESH_TOKEN;
  const token = jwt.sign(payload, secret, {
    expiresIn: expiry || "1h",
  });

  return token;
};
