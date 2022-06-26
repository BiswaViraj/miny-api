import { model, Schema, Types } from "mongoose";

export interface IAnalytics {
  urlId: Types.ObjectId;
  country: string;
  browser: string;
  deviceType: string;
  os: string;
  userId: Types.ObjectId;
}

const analyticSchema = new Schema<IAnalytics>(
  {
    urlId: {
      type: Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
