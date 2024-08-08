import parse from 'parse-diff';
import type { Context } from 'probot';
import type { FileDiff, Configuration as AppConfiguration } from '@/types/config';
import { defaultConfig } from '@/data/default-config';

export async function getFileContent(context: Context<'pull_request'>, filePath: string, ref: string): Promise<string> {
	const { owner, repo } = context.repo();

	try {
		const response = await context.octokit.repos.getContent({
			owner,
			repo,
			path: filePath,
			ref,
		});

		if (Array.isArray(response.data) || !('content' in response.data)) {
			throw new Error(`Unexpected response for file: ${filePath}`);
		}

		const content = Buffer.from(response.data.content, 'base64').toString('utf8');

		return content;
	} catch (error) {
		console.error(`Failed to fetch content for ${filePath} at ref ${ref}:`, error);

		return '';
	}
}

export function parseDiff(diff: string): FileDiff[] {
	const fileDiffs: FileDiff[] = [];
	const files = parse(diff);

	files.forEach((file) => {
		const { to, chunks } = file;
		const fileName = to?.split('/').pop();

		if (defaultConfig.excludeFiles.includes(fileName ?? 'unknown')) {
			return;
		}

		chunks.forEach((chunk) => {
			let currentBlock: FileDiff | null = null;

			chunk.changes.forEach((change) => {
				if (change.type === 'add') {
					if (currentBlock && change.ln === currentBlock.lineEnd + 1 && currentBlock.filePath === (to ?? 'unknown')) {
						currentBlock.lineEnd = change.ln;
						currentBlock.newCode += '\n' + change.content;
					} else {
						if (currentBlock) {
							fileDiffs.push(currentBlock);
						}

						currentBlock = {
							filePath: to ?? 'unknown',
							lineStart: change.ln,
							lineEnd: change.ln,
							originalCode: '',
							newCode: change.content,
							entireFile: '',
						};
					}
				}
			});

			if (currentBlock) {
				fileDiffs.push(currentBlock);
			}
		});
	});

	return fileDiffs;
}

export function shouldReviewFile(linesChanged: number, filePath: string, targetBranch: string, config: AppConfiguration): boolean {
	const fileExtension = filePath.split('.').pop();
	const fileName = filePath.split('/').pop();

	if (linesChanged < config.minLinesChanged || linesChanged > config.maxLinesChanged) {
		console.log(`File ${filePath} has ${linesChanged} lines changed, which is outside the configured range.`);

		return false;
	}

	if (config.excludeFiles.includes(fileName ?? 'unknown')) {
		console.log(`File ${filePath} is in the exclude list.`);

		return false;
	}

	if (fileExtension && config.excludeFileExtensions.includes(fileExtension)) {
		console.log(`File ${filePath} with extension ${fileExtension} is in the exclude extensions list.`);

		return false;
	}

	if (fileExtension && !config.includeFileExtensions.includes(fileExtension)) {
		console.log(`File ${filePath} with extension ${fileExtension} is not in the include extensions list.`);

		return false;
	}

	if (targetBranch !== config.targetBranch) {
		console.log(`Target branch ${targetBranch} does not match the configured target branch ${config.targetBranch}.`);

		return false;
	}

	console.log(`File ${filePath} meets all criteria for review.`);

	return true;
}
