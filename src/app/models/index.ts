import { dbConfig } from "../config/db.config";

let Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: dbConfig.HOST,
  port: dbConfig.port,
  database: dbConfig.DB,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
 .catch((err: Error) => {
 console.error('Unable to connect to the database:', err);
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  user: require("../models/user.model.ts")(sequelize, Sequelize),
  role: require("../models/role.model.ts")(sequelize, Sequelize),
  ROLES: ["user", "admin"],
  initialize: function() {}
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

const Role = db.role;

db.initialize = function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
}

export { db };