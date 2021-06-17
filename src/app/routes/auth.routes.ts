const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");
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

router.post(
  "/api/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    verifySignUp.checkPasswordValidation
  ],
  controller.signUp
);

router.post("/api/auth/signin", controller.signIn);