import express from "express";
import { PetControllers } from "./pets.controller";

const router = express.Router();

router.post("/", PetControllers.createAPet);
router.get("/", PetControllers.getFilteredPet);

export const PetRoutes = router;
