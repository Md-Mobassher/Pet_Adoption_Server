import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDb;
  res.send({
    message: "User registered successfully",
    data: result,
  });
};

export const AuthControllers = {
  createUser,
};
