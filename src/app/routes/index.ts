import express from "express";
import { authRoutes } from "../modules/auth/auth.router";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/register",
    route: authRoutes,
  },
  {
    path: "/register",
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
