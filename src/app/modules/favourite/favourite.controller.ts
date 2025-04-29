import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { FavouriteServices } from "./favourite.service";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helper/jwtHelpers";
import config from "../../config";
import ApiError from "../../errors/ApiError";

const createFavourite = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const { id } = jwtHelpers.verifyToken(
    token,
    config.jwt.access_secret as string
  );

  const result = await FavouriteServices.createAdoptionIntoDb(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Add to Favorite successfully",
    data: result,
  });
});

const getMyFavourite = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const { id } = jwtHelpers.verifyToken(
    token,
    config.jwt.access_secret as string
  );

  const result = await FavouriteServices.getMyFavourite(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Favorites retrieved successfully",
    data: result,
  });
});

const getAllFavourite = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const { id } = jwtHelpers.verifyToken(
    token,
    config.jwt.access_secret as string
  );

  const result = await FavouriteServices.getAllFavourite(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Favorites retrieved successfully",
    data: result,
  });
});

const deleteFavouriteStatus = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
    const { id } = jwtHelpers.verifyToken(
      token,
      config.jwt.access_secret as string
    );
    const { id: requestId } = req.params;

    const result = await FavouriteServices.deleteFavouriteStatus(id, requestId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Pet Deleted from Favorite list",
      data: result,
    });
  }
);

export const FavoriteControllers = {
  createFavourite,
  getMyFavourite,
  getAllFavourite,
  deleteFavouriteStatus,
};
