import express from "express";
import { FavoriteControllers } from "./favourite.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createFavouriteValidationSchema,
  updateFavouriteValidationSchema,
} from "./favourite.validation";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(createFavouriteValidationSchema),
  FavoriteControllers.createFavourite
);

router.get("/", auth(UserRole.USER), FavoriteControllers.getMyFavourite);

router.get(
  "/all",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  FavoriteControllers.getAllFavourite
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(updateFavouriteValidationSchema),
  FavoriteControllers.deleteFavouriteStatus
);

export const FavoriteRoutes = router;
