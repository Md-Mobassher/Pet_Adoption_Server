import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/register",
    route: userRoutes,
  },
  {
    path: "/login",
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
