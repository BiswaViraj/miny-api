import winston from "winston";
import { IS_PROD } from "./constant";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: IS_PROD ? "info" : "debug",
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message, timestamp }) =>
        `${level}-${timestamp}: \n${message}\n================\n`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
