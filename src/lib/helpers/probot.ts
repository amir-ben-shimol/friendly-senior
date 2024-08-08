import { createProbot, createNodeMiddleware } from "probot";
import { BASE_WEBHOOK_PATH } from "../data/consts";
import { env } from "./env";
import { probotApp } from "../../apps/probot-app";

const probot = createProbot({
  overrides: {
    appId: env.GITHUB_APP_ID,
    privateKey: env.GITHUB_PRIVATE_KEY,
    secret: env.WEBHOOK_SECRET,
  },
});

probot.load(probotApp);

const probotMiddleware = createNodeMiddleware(probotApp, { probot, webhooksPath: BASE_WEBHOOK_PATH });

export { probotMiddleware };
