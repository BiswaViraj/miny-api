import { NextFunction, Response } from "express";
import { getVisitsByUser } from "../service/analytics.service";
import { IRequest } from "../types/userRequest";
import { HttpException } from "../utils/errorHandler";

export const getAnalyticsByUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { options } = req.body;
    const userId = req.userId;

    if (!userId) throw new HttpException("Not Authorized", 403);

    const analytics = await getVisitsByUser(userId, options);

    res.status(200).json({
      analytics,
    });
  } catch (error) {
    next(error);
  }
};
