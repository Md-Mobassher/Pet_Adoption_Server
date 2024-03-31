import express from "express";
import { AdoptionControllers } from "./adoption.controller";

const router = express.Router();

router.post("/", AdoptionControllers.createAdoptionRequest);

router.get("/", AdoptionControllers.getAdoptionRequest);

router.put("/:requestId", AdoptionControllers.updateAdoptionRequestStatus);

export const AdoptionRoutes = router;
