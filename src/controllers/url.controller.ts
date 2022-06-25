import { NextFunction, Request, Response } from "express";
import { create } from "../service/url.service";

export const createUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { originalURL, customURL, timeout, userId } = req.body;

    const shortURL = await create({
      originalURL,
      customURL,
      timeout,
      userId,
    });
    res.json({
      shortURL,
    });
  } catch (error) {
    next(error);
  }
};
