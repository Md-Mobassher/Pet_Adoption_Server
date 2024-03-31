import express from "express";
import { PetControllers } from "./pets.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createPetValidationSchema,
  updatePetValidationSchema,
} from "./pet.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createPetValidationSchema),
  PetControllers.createAPet
);

router.get("/", PetControllers.getFilteredPet);

router.put(
  "/:petId",
  validateRequest(updatePetValidationSchema),
  PetControllers.updateAPet
);

export const PetRoutes = router;
