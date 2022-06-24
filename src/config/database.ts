import { connect, ConnectOptions } from "mongoose";
import { DB_URI } from "./constant";

const connectDB = async () => {
  try {
    const mongoURI = DB_URI;

    console.log({
      DB_URI,
    });
    // const options: ConnectOptions = {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    // };
    await connect(mongoURI);
    console.log("DATABASE Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
