import logger from "../config/logger";
import Analytics from "../models/analytics.model";
import { IUrl } from "../models/url.model";
import { getClientInfo } from "../utils/clientInfo";

export const addVisit = async (
  urlId: IUrl["_id"],
  userAgent: string | undefined
) => {
  const payload = {
    urlId,
    browser: "N/A",
    deviceType: "N/A",
    os: "N/A",
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
