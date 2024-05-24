import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDb(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created successfuly!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  createUser,
};
