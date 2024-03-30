import express from "express";
import { PetControllers } from "./pets.controller";

const router = express.Router();

router.post("/", PetControllers.createAPet);

router.get("/", PetControllers.getFilteredPet);

router.put("/:petId", PetControllers.updateAPet);

export const PetRoutes = router;
