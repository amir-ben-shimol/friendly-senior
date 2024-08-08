import express from 'express';
import { redisClient } from '@/helpers/redis';
import { errorHandler, requestLogger, responseLogger } from '@/helpers/middleware';
import { probotMiddleware } from '@/helpers/probot';
import { router } from '@/routes/index';

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
