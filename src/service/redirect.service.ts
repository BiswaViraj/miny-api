import logger from "../config/logger";
import { HttpException } from "../utils/errorHandler";
import { findOneUrl } from "./url.service";

export const checkAndRedirectURL = async (url: string) => {
  const urlFound = await findOneUrl({
    shortURL: url,
  });
  logger.info(`${url} -service`);
  if (!urlFound) throw new HttpException("URL not found", 404);
  logger.info(`URL visited: ${urlFound.shortURL}`);
  return urlFound;
};
