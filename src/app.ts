import express from "express";
import { redisClient } from "./lib/helpers/redis";
import { requestLogger, responseLogger, errorHandler } from "./lib/helpers/middleware";
import { router } from "./lib/routes";
import { probotMiddleware } from "./lib/helpers/probot";

const app = express();

(async () => {
  await redisClient.connect();

  app.use(requestLogger);
  app.use(responseLogger);
  app.use(probotMiddleware);
  app.use(errorHandler);
  app.use(router);
})();

export { app };
