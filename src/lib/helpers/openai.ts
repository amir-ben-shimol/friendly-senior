import OpenAI from "openai";
import { Configuration as AppConfiguration } from "../types/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateReviewComments(
  originalCode: string,
  newCode: string,
  entireFile: string,
  config: AppConfiguration
): Promise<string> {
  console.log("inside generateReviewComments");
  const basePrompt = `You are a code reviewer. Provide concise and actionable suggestions for improvement on the new changes only. Avoid lengthy explanations. The entire file content is provided for context only. Do not make suggestions about parts of the code that are not in the new changes.`;

  const prompt = config.customPrompt ? config.customPrompt : basePrompt;

  const reviews = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: `Original Code:\n${originalCode}\n\nNew Code:\n${newCode}\n\nEntire File:\n${entireFile}`,
      },
    ],
    max_tokens: config.enableDetailedExplanations ? 300 : 150,
  });

  const reviewContent = reviews.choices[0].message?.content;

  console.log("Review content:", reviewContent);

  return reviewContent?.trim() || "";
}
