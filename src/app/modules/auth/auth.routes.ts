import express from "express";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post("/", AuthControllers.loginUser);

export const authRoutes = router;
