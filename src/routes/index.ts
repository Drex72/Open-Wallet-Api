import express, { Router } from "express";
import authRouter from "./authRoutes";
import walletRouter from "./walletRoutes";

const router = express.Router();

type routeObject = {
  path: string;
  routes: Router;
};

const allRoutes: routeObject[] = [
  {
    path: "/auth",
    routes: authRouter,
  },
  {
    path: "/wallet",
    routes: walletRouter,
  },
];

allRoutes.map((route) => {
  router.use(route.path, route.routes);
});

export default router;
