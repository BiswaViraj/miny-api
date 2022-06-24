import { Document, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param firstName:string
 * @param lastName:string
 */
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
