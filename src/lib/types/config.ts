export type Configuration = {
  /** The target branch for pull requests */
  targetBranch: string;
  /** Array of keywords for relevant project technologies */
  techKeywords: string[];
  /** Minimum number of lines changed in a pull request to trigger a review */
  minLinesChanged: number;
  /** Maximum number of lines changed in a pull request to trigger a review */
  maxLinesChanged: number;
  /** Array of file extensions to include in the review */
  includeFileExtensions: string[];
  /** Array of file extensions to exclude from the review */
  excludeFileExtensions: string[];
  /** Array of filenames to exclude from the review */
  excludeFiles: string[];
  /** Custom prompt to be used for the OpenAI API */
  customPrompt?: string;
  /** Whether to enable detailed explanations in the review comments */
  enableDetailedExplanations: boolean;
  /** Levels of comments to be shown by the bot */
  // commentLevel: CommentLevel[];
};

// export type CommentLevel =
//   | "general"
//   | "improvement"
//   | "suggestion"
//   | "question"
//   | "praise"
//   | "criticism"
//   | "error"
//   | "warning"
//   | "info"
//   | "debug";

export type FileDiff = {
  filePath: string;
  lineStart: number;
  lineEnd: number;
  originalCode: string;
  newCode: string;
  entireFile: string;
  reviewComment?: string;
  commentLevel?: string; // Added commentLevel attribute
};

// export type ReviewComment = {
//   comment: string;
//   commentLevel: CommentLevel[];
// };
