import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { PetServices } from "./pet.service";
import pick from "../../shared/pick";
import { petFilterableFields, petSearchAbleFields } from "./pet.constant";
import { jwtHelpers } from "../../helper/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";

const createAPet = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const { id } = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);

  const result = await PetServices.createAPet(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

const getFilteredPet = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PetServices.getFilteredPet(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pets retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateAPet = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const { id } = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);
  const { petId } = req.params;

  const result = await PetServices.updateAPet(petId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet profile updated successfully",
    data: result,
  });
});

export const PetControllers = {
  createAPet,
  getFilteredPet,
  updateAPet,
};
