import express from "express";
import { UserControllers } from "./user.controller";
import { updateUserValidationSchema } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/profile", UserControllers.getUserInfo);

router.put(
  "/update-profile",
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUserInfo
);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserControllers.getMyProfile
);

export const UserRoutes = router;
