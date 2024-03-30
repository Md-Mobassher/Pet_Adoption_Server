import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { AdoptionServices } from "./adoption.service";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helper/jwtHelpers";
import config from "../../config";

const createAdoptionRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const { id } = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_secret as Secret
    );

    const result = await AdoptionServices.createAdoptionIntoDb(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

export const AdoptionControllers = {
  createAdoptionRequest,
};
