import { Probot } from "probot";
import { Configuration } from "./config";
import { reviewPullRequest } from "./review";

export const probotApp = (app: Probot, config: Configuration) => {
  app.on("pull_request.opened", async (context) => {
    const pr = context.payload.pull_request;
    if (pr.base.ref === config.targetBranch) {
      await reviewPullRequest(context, pr, config);
    }
  });
};
