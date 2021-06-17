import { db } from "../models";
import config = require("../config/auth.config");
import { Request, Response } from "express";

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.signUp = (req: Request, res: Response) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then((user: any) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then((roles: any) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!", id: user.id });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!", id: user.id });
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signIn = (req: Request, res: Response) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user: any) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      let authorities: Array<any> = [];
      user.getRoles().then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};