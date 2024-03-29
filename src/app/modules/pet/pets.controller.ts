import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { PetServices } from "./pet.service";

const createAPet = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.createAPet(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

export const PetControllers = {
  createAPet,
};
