import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createUserValidationSchema,
  loginValidationSchema,
} from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  AuthControllers.createUser
);

export const AuthRoutes = router;
