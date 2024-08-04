import { Context } from "probot";
import { Configuration as AppConfiguration } from "./config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function reviewPullRequest(context: Context<"pull_request">, pr: any, config: AppConfiguration) {
  const { owner, repo } = context.repo();
  const diff = await context.octokit.pulls.get({
    owner,
    repo,
    pull_number: pr.number,
    mediaType: {
      format: "diff",
    },
  });

  const response = await openai.completions.create({
    model: "text-davinci-002",
    prompt: `Review the following code and provide ${config.maxReviews} suggestions for improvement:\n\n${diff.data}`,
    max_tokens: 150,
  });

  const comments = response.choices[0].text?.split("\n").filter((line) => line.trim() !== "");

  if (comments) {
    for (const comment of comments) {
      await context.octokit.issues.createComment({
        owner,
        repo,
        issue_number: pr.number,
        body: comment,
      });
    }
  }
}
