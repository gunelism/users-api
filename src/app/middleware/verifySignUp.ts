import { db } from "../models";
import { Request, Response, NextFunction } from "express";

const ROLES = db.ROLES;
const User = db.user;

// bunu ayir iki metoda
const checkDuplicateUsernameOrEmail = (req: Request, res: Response, next: NextFunction) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user: any) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user: any) => {  //burda user-e tip tap
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

const checkPasswordValidation = (req: Request, res: Response, next: NextFunction) => {
  if(req.body.password.length < 6 || req.body.password.length > 40){
    res.status(400).send({
      message: "Failed! The password must be between 6 and 40 characters!"
    });
    return;
  }

  next();
}

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkPasswordValidation: checkPasswordValidation
};

module.exports = verifySignUp;