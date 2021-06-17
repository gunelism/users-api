const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
import { Request, Response, NextFunction} from "express";
import { Router } from 'express';

export const router: Router = Router();

router.use(function(req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/role/all", controller.allAccess);

router.get(
  "/api/role/user",
  [authJwt.verifyToken],
  controller.userBoard
);