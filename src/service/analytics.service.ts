import { FilterQuery } from "mongoose";
import logger from "../config/logger";
import Analytics, { IAnalytics } from "../models/analytics.model";
import { getClientInfo } from "../utils/clientInfo";

export interface IAddVisit {
  urlId: string;
  userAgent?: string | undefined;
  userId?: string;
}
export const addVisit = async ({ urlId, userAgent, userId }: IAddVisit) => {
  const payload = {
    urlId,
    browser: "N/A",
    deviceType: "N/A",
    os: "N/A",
    ...(userId && { userId }),
  };

  if (userAgent) {
    const { client, device, os: c_os } = getClientInfo(userAgent);
    payload.browser = (client?.type === "browser" && client?.name) || "N/A";
    payload.deviceType = device?.type || "N/A";
    payload.os = c_os?.name || "N/A";
  }
  // TODO: add country
  const analytic = new Analytics({
    ...payload,
  });

  await analytic.save();
  logger.info(`Analytics: ${JSON.stringify(payload)}`);
  return analytic;
};

export const getVisitsByUser = async (
  userId: string,
  options?: FilterQuery<IAnalytics>
) => {
  try {
    const analytics = await Analytics.find({
      userId,
      ...(options && { options }),
    });
    return analytics;
  } catch (error) {
    throw new Error(error);
  }
};
