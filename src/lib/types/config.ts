export type Configuration = {
	/**
	 * The target branch for pull requests.
	 * This is the branch against which the pull requests will be reviewed.
	 */
	targetBranch: string;

	/**
	 * Array of keywords for relevant project technologies.
	 * These keywords help to identify the technologies used in the project,
	 * enabling the review process to be more context-aware.
	 */
	techKeywords: string[];

	/**
	 * Minimum number of lines changed in a pull request to trigger a review.
	 * If the number of lines changed in a pull request is below this threshold,
	 * the review process will not be triggered.
	 */
	minLinesChanged: number;

	/**
	 * Maximum number of lines changed in a pull request to trigger a review.
	 * If the number of lines changed in a pull request exceeds this threshold,
	 * the review process will not be triggered.
	 */
	maxLinesChanged: number;

	/**
	 * Array of file extensions to include in the review.
	 * Only files with these extensions will be considered for the review process.
	 */
	includeFileExtensions: string[];

	/**
	 * Array of file extensions to exclude from the review.
	 * Files with these extensions will be ignored during the review process.
	 */
	excludeFileExtensions: string[];

	/**
	 * Array of filenames to exclude from the review.
	 * Specific files that should be ignored during the review process.
	 */
	excludeFiles: string[];

	/**
	 * Custom prompt to be used for the OpenAI API.
	 * This prompt can be tailored to customize the type of feedback provided by the OpenAI model.
	 */
	customPrompt?: string;

	/**
	 * Whether to enable detailed explanations in the review comments.
	 * If true, the review comments will include detailed explanations and suggestions.
	 */
	enableDetailedExplanations: boolean;
};

export type FileDiff = {
	/**
	 * The path of the file that has been changed.
	 * This provides the location of the file within the repository.
	 */
	filePath: string;

	/**
	 * The starting line number of the changes in the file.
	 * Indicates where the modifications begin in the file.
	 */
	lineStart: number;

	/**
	 * The ending line number of the changes in the file.
	 * Indicates where the modifications end in the file.
	 */
	lineEnd: number;

	/**
	 * The original code before the changes.
	 * This represents the code as it was before the pull request modifications.
	 */
	originalCode: string;

	/**
	 * The new code after the changes.
	 * This represents the code after the pull request modifications.
	 */
	newCode: string;

	/**
	 * The entire content of the file.
	 * This is the complete file content after the modifications.
	 */
	entireFile: string;

	/**
	 * The review comment generated for the file.
	 * This is an optional field that contains the feedback provided by the review process.
	 */
	reviewComment?: string;
};
