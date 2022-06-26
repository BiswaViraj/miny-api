import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN } from "../config/constant";
import TokenType from "../types/tokenType";
import { IRequest } from "../types/userRequest";
import { HttpException } from "../utils/errorHandler";

export const authMiddleware = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new HttpException("Not Authenticated", 401);
    }

    const token = authHeader.split(" ")[1];

    let decodedToken: TokenType;

    try {
      decodedToken = jwt.verify(token, JWT_ACCESS_TOKEN) as TokenType;
    } catch (err) {
      throw new HttpException("Token expired", 401);
    }

    if (!decodedToken) {
      throw new HttpException("Not Authenticated", 401);
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    next(error);
  }
};
