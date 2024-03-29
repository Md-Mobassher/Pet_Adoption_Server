import express from "express";
import { PetRoutes } from "../modules/pet/pet.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/register",
    route: UserRoutes,
  },
  {
    path: "/login",
    route: AuthRoutes,
  },
  {
    path: "/pets",
    route: PetRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
