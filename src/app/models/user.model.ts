import { Sequelize } from "sequelize/types";

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};