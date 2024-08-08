import "dotenv/config";

if (
  !process.env.GITHUB_APP_ID ||
  !process.env.GITHUB_PRIVATE_KEY ||
  !process.env.WEBHOOK_SECRET ||
  !process.env.REDIS_URL
) {
  throw new Error("Missing required environment variables");
}

export const env = {
  GITHUB_APP_ID: process.env.GITHUB_APP_ID,
  GITHUB_PRIVATE_KEY: process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, "\n"), // Ensure newlines are preserved
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  REDIS_URL: process.env.REDIS_URL,
  PORT: process.env.PORT || 3000,
};
