import { dbConfig } from "../config/db.config";

let Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  user: require("../models/user.model.ts")(sequelize, Sequelize),
  role: require("../models/role.model.ts")(sequelize, Sequelize),
  ROLES: ["user", "admin"]
};

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//bax ki bu relation-lar modelde ola bilermi.

export { db };