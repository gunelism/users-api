const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");
import { Request, Response, NextFunction} from "express";
import { Router } from 'express';
import { BASE_ENDPOINT } from '../../constants/endpoint';

export const router: Router = Router();

router.use(function(req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  `${BASE_ENDPOINT}/auth/signup`,
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    verifySignUp.checkPasswordValidation
  ],
  controller.signUp
);

router.post(`${BASE_ENDPOINT}/auth/signin`, controller.signIn);