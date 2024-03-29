import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDb(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created successfuly!",
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
