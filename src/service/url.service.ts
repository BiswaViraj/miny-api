import { FilterQuery } from "mongoose";
import logger from "../config/logger";
import { Url } from "../models";
import { IUrl } from "../models/url.model";
import { HttpException } from "../utils/errorHandler";
import { createShortUrl } from "../utils/urlhandler";

const retryUrlGeneration = async (): Promise<string> => {
  const shortURL = createShortUrl();
  const isExists = await findOneUrl({
    shortURL,
  });
  if (isExists) return retryUrlGeneration();
  return shortURL;
};

export const findOneUrl = async (params: FilterQuery<IUrl>) => {
  try {
    const url = await Url.findOne({ ...params });

    return url;
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async ({
  originalURL,
  customURL,
  userId,
  timeout,
}: Partial<IUrl>) => {
  try {
    let shortURL = customURL;
    if (shortURL) {
      const isExists = await findOneUrl({
        shortURL,
      });
      if (isExists) {
        throw new HttpException("Custom URL already exists.", 403);
      }
    } else {
      shortURL = await retryUrlGeneration();
    }

    const url = new Url({
      originalURL,
      shortURL,
      ...(userId && { userId }),
      ...(timeout && { timeout }),
    });
    logger.info(`Created: ${url}`);
    await url.save();
    return url.shortURL;
  } catch (error) {
    throw new HttpException(error.message, error?.status);
  }
};
