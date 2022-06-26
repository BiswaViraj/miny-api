import { FilterQuery } from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { IUser } from "../models/user.model";
import { HttpException } from "../utils/errorHandler";
import { createJWTToken } from "../utils/tokenHandler";
export interface ISignupUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export const findOneUser = async (params: FilterQuery<IUser>) => {
  const user = User.findOne({ ...params });
  return user;
};

export const signupUser = async ({
  email,
  firstName,
  lastName,
  password,
}: ISignupUser) => {
  const isUser = await findOneUser({ email });
  if (isUser) throw new HttpException("Email already exists", 422);

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    userId: newUser._id,
  };
};

export const loginUser = async (email: string, password: string) => {
  const isUser = await findOneUser({ email });
  if (!isUser) throw new HttpException("User not found", 404);

  const isValidPassword = await bcrypt.compare(password, isUser.password);
  if (!isValidPassword)
    throw new HttpException("Incorrect username/password", 403);
  const userId = isUser._id.toString();
  const accessToken = createJWTToken(
    {
      email: isUser.email,
      userId,
    },
    "access",
    "1h"
  );

  const refreshToken = createJWTToken(
    {
      email: isUser.email,
      userId,
    },
    "refresh",
    "15 days"
  );

  return {
    firstName: isUser.firstName,
    lastName: isUser.lastName,
    email: isUser.email,
    userId,
    accessToken,
    refreshToken,
  };
};
