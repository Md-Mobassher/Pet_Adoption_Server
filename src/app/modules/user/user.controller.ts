import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { UserServices } from "./user.service";
import { jwtHelpers } from "../../helper/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";

const getUserInfo = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { id } = jwtHelpers.verifyToken(
    token,
    config.jwt.access_secret as Secret
  );

  const result = await UserServices.getUserInfo(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { id } = jwtHelpers.verifyToken(
    token,
    config.jwt.access_secret as Secret
  );
  const result = await UserServices.updateUserInfo(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User profile updated successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await UserServices.getMyProfile(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile data fetched!",
    data: result,
  });
});

export const UserControllers = {
  getUserInfo,
  updateUserInfo,
  getMyProfile,
};
