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
    const userId = urlFound?.userId.toString();
    const userAgent = req.headers["user-agent"];
    await addVisit({
      urlId: urlFound.id,
      userAgent,
      ...(userId && { userId }),
    });
    res.status(301).redirect(urlFound.originalURL);
  } catch (error) {
    next(error);
  }
};
