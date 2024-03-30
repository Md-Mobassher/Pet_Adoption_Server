import express from "express";
import { AdoptionControllers } from "./adoption.controller";

const router = express.Router();

router.post("/", AdoptionControllers.createAdoptionRequest);

export const AdoptionRoutes = router;
