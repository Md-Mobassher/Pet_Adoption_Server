import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUser);

router.get("/", UserControllers.getUserInfo);

router.put("/", UserControllers.updateUserInfo);

export const UserRoutes = router;
