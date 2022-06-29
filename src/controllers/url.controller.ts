import { NextFunction, Response } from "express";
import { create, getUserUrlById } from "../service/url.service";
import { IRequest } from "../types/userRequest";
import { HttpException } from "../utils/errorHandler";

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

export const getUserUrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.userId;

    if (!userId) throw new HttpException("Not Authenticated", 403);

    const urls = await getUserUrlById(userId);
    res.status(200).json({
      urls,
    });
  } catch (error) {
    next(error);
  }
};
