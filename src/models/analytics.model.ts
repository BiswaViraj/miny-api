import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IAnalytics extends Document {
  urlId: IUser["_id"];
  country: string;
  browser: string;
  deviceType: string;
  os: string;
}

const analyticSchema = new Schema(
  {
    urlId: {
      type: Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },
    country: {
      type: String,
    },
    browser: {
      type: String,
    },
    deviceType: {
      type: String,
    },
    os: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Analytics = model<IAnalytics>("Analytics", analyticSchema);

export default Analytics;
