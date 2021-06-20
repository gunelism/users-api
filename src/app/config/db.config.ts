export const dbConfig = {
  HOST: "users-mysql",
  USER: "root",
  PASSWORD: "root",
  port: '3306',
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};