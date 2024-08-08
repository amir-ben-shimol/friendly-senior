/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly OPENAI_API_KEY: string;
			readonly GITHUB_APP_ID: string;
			readonly GITHUB_PRIVATE_KEY: string;
			readonly WEBHOOK_SECRET: string;
			readonly PORT: string;
			readonly REDIS_URL: string;
		}
	}
}

export {};
