import express from "express";
import { UserControllers } from "./user.controller";
import {
  changeUserRole,
  changeUserStatus,
  updateUserValidationSchema,
} from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserControllers.getAllUsers
);
router.get(
  "/profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserControllers.getUserInfo
);

router.put(
  "/update-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUserInfo
);

router.patch(
  "/change-status/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(changeUserStatus),
  UserControllers.changeStatus
);

router.patch(
  "/edit-role/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(changeUserRole),
  UserControllers.changeRole
);

export const UserRoutes = router;
