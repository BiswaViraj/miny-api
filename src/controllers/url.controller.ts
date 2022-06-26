import { NextFunction, Response } from "express";
import { create } from "../service/url.service";
import { IRequest } from "../types/userRequest";

export const createUrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { originalURL, customURL, timeout } = req.body;
    const userId = req?.userId;
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
