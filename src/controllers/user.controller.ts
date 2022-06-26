import { NextFunction, Request, Response } from "express";
import { loginUser, signupUser } from "../service/user.service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const user = await signupUser({
      email,
      firstName,
      lastName,
      password,
    });

    res.status(201).json({
      message: "User Created",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const userDetails = await loginUser(email, password);

    res.status(200).json({
      message: "success",
      data: userDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(200).json({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
