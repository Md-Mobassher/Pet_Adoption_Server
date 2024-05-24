import express from "express";
import { UserControllers } from "./user.controller";
import { updateUserValidationSchema } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.get("/profile", UserControllers.getUserInfo);

router.put(
  "/update-profile",
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUserInfo
);

export const UserRoutes = router;
