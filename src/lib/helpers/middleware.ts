import type { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
	console.log(`Incoming request: ${req.method} ${req.url}`);
	next();
};

export const responseLogger = (_req: Request, res: Response, next: NextFunction) => {
	res.on('finish', () => {
		console.log(`Response status: ${res.statusCode}`);
	});
	next();
};

export const errorHandler = (err: Error, _req: Request, res: Response) => {
	console.error('Error handling request', err);
	res.status(500).send('Internal Server Error');
};
