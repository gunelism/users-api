import { db } from "../models";
import config = require("../config/auth.config");
import { Request, Response, NextFunction } from "express";

let jwt = require("jsonwebtoken");

const User = db.user;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err: Error, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.body.userId = decoded.id;
    next();
  });
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    User.findByPk(req.body.userId).then((user: any) => { 
      user.getRoles().then((roles: any) => { //burda da tip tap
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};

module.exports = authJwt;