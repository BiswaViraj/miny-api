import { NextFunction, Request, Response } from "express";
import { addVisit } from "../service/analytics.service";
import { checkAndRedirectURL } from "../service/redirect.service";

export const redirectURL = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = req.params.shortURL;
    const urlFound = await checkAndRedirectURL(url);
    const userAgent = req.headers["user-agent"];
    await addVisit(urlFound.id, userAgent);
    res.status(301).redirect(urlFound.originalURL);
  } catch (error) {
    next(error);
  }
};
