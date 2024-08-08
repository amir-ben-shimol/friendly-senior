import type { Probot, Context, ApplicationFunction } from 'probot';
import type { Configuration } from '@/types/config';
import { reviewPullRequest } from '@/helpers/review-pull-request';
import { redisClient } from '@/helpers/redis';
import { defaultConfig } from '@/data/default-config';

const acquireLock = async (key: string, expiry: number) => {
	const result = await redisClient.set(key, 'locked', {
		NX: true,
		EX: expiry,
	});

	return result === 'OK';
};

const releaseLock = async (key: string) => {
	await redisClient.del(key);
};

export const probotApp: ApplicationFunction = (app: Probot) => {
	console.log('probotApp called');

	app.on('pull_request.opened', async (context: Context<'pull_request'>) => {
		console.log('pull_request.opened called');

		const eventId = context.id;
		const lockKey = `lock:${eventId}`;

		console.log(`Processing event ${eventId}`);

		const lockAcquired = await acquireLock(lockKey, 30); // Lock expires in 30 seconds

		if (!lockAcquired) {
			console.log(`Could not acquire lock for event ${eventId}. Skipping...`);

			return;
		}

		try {
			const processed = await redisClient.get(eventId);

			console.log(`Event ${eventId} processed:`, processed);

			if (processed) {
				console.log(`Event ${eventId} has already been processed. Skipping...`);

				return;
			}

			await redisClient.set(eventId, 'processed', { EX: 60 * 60 * 24 }); // Expire after 24 hours

			const userConfig = await context.config<Configuration>('codementorai.yml');
			const config: Configuration = { ...defaultConfig, ...userConfig };

			if (!config) {
				context.log.error('Configuration file "codementorai.yml" not found.');

				return;
			}

			context.log.info('payload:', context.payload);
			const pr = context.payload.pull_request;

			context.log.info('pr.base.ref:', pr.base.ref);

			if (pr.base.ref === config.targetBranch) {
				console.log('Reviewing PR:', pr.number);
				await reviewPullRequest(context, pr, config);
			}
		} finally {
			await releaseLock(lockKey);
		}
	});
};
