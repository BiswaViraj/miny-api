import { nanoid } from "nanoid";
export const createShortUrl = () => {
  const shortURL = nanoid(8);
  return shortURL;
};
