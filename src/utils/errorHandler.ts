import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";

export class HttpException extends Error {
  public status: number;
  public message: string;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function errorHandler(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  logger.error(error);
  response.status(status).send({
    message,
    status,
  });
}

export default errorHandler;
