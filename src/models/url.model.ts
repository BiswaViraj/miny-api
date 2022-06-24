import { Document, model, Schema } from "mongoose";

export interface IUrl extends Document {
  originalURL: string;
  customURL?: string;
  shortURL: string;
  userId: string | null;
  active: boolean;
  timeout: Date;
}

const urlSchema = new Schema({
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
});

const Url = model<IUrl>("Url", urlSchema);

export default Url;
