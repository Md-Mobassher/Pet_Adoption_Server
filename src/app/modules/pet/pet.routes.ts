import express, { NextFunction, Request, Response } from "express";
import { PetControllers } from "./pets.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createPetValidationSchema,
  updatePetValidationSchema,
} from "./pet.validation";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { FileUploadHelper } from "../../helper/fileUploadHelper";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),

  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createPetValidationSchema.parse(JSON.parse(req.body.data));
    return PetControllers.createAPet(req, res, next);
  }
);

router.get("/", PetControllers.getFilteredPet);

router.get(
  "/:petId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),

  PetControllers.getAPet
);

router.put(
  "/:petId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(updatePetValidationSchema),
  PetControllers.updateAPet
);

export const PetRoutes = router;
