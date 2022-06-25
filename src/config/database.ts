import { connect } from "mongoose";
import { DB_URI } from "./constant";
import logger from "./logger";

const connectDB = async () => {
  try {
    const mongoURI = DB_URI;
    await connect(mongoURI);
    logger.info("DATABASE Connected...");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectDB;
