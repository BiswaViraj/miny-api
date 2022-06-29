import { FilterQuery } from "mongoose";
import logger from "../config/logger";
import { Url } from "../models";
import { IUrl } from "../models/url.model";
import { HttpException } from "../utils/errorHandler";
import { createShortUrl, urlValidator } from "../utils/urlhandler";
export interface ICreateURL {
  originalURL: string;
  customURL?: string;
  userId?: string;
  timeout?: Date | string;
}
export const retryUrlGeneration = async (): Promise<string> => {
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
}: ICreateURL) => {
  try {
    const { isValid, newURL } = checkValidURL(originalURL as string);
    if (!isValid) throw new HttpException("Invalid URL", 400);
    const isCustom = !!customURL;
    let shortURL = customURL?.trim();
    if (isCustom) {
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
      originalURL: newURL.trim(),
      shortURL,
      isCustom,
      ...(userId && { userId }),
      ...(timeout && { timeout }),
    });
    await url.save();
    logger.info(`Created: ${url}`);
    return url.shortURL;
  } catch (error) {
    throw new HttpException(error.message, error?.status);
  }
};

export const checkValidURL = (url: string) => {
  let tempUrl = url;
  const isValid = urlValidator(tempUrl);

  logger.info(isValid);
  // update the URL with http/https to check again for validity
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    tempUrl = `http://${tempUrl}`;
  }
  return {
    newURL: tempUrl,
    isValid: urlValidator(tempUrl),
  };
};

export const getUserUrlById = async (userId: string) => {
  const urls = Url.find({
    userId,
  });

  return urls;
};
