import express from "express";
import { AdoptionControllers } from "./adoption.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createAdoptionRequestValidationSchema,
  updateAdoptionRequestValidationSchema,
} from "./adoption.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createAdoptionRequestValidationSchema),
  AdoptionControllers.createAdoptionRequest
);

router.get("/", AdoptionControllers.getAdoptionRequest);

router.put(
  "/:requestId",
  validateRequest(updateAdoptionRequestValidationSchema),
  AdoptionControllers.updateAdoptionRequestStatus
);

export const AdoptionRoutes = router;
