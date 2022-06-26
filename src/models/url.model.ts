import { model, Schema, Types } from "mongoose";

export interface IUrl {
  originalURL: string;
  customURL?: string;
  shortURL: string;
  userId: Types.ObjectId;
  active: boolean;
  timeout: Date;
  isCustom: boolean;
}

const urlSchema = new Schema<IUrl>(
  {
    originalURL: {
      type: String,
      required: true,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    timeout: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Url = model<IUrl>("Url", urlSchema);

export default Url;
