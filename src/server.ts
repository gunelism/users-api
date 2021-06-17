import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from '../config.json';
import { getFilesWithKeyword } from './utils/getFilesWithKeyword';
import { db } from "./app/models";

const app: Express = express();

// Middleware
app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle logs in console during development
if (process.env.NODE_ENV === 'development' || config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors({ origin: "http://localhost:8081" }));
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
}

// Initialize Sequelize
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  db.initialize();
}); 

// Register all routes
getFilesWithKeyword('routes', __dirname + '/app').forEach((file: string) => {
  const { router } = require(file);
  app.use('/', router);
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(500).json({
    errorName: err.name,
    message: err.message,
    stack: err.stack || 'no stack defined'
  });
});

export default app;