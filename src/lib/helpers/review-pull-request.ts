import type { Context } from 'probot';
import type { Configuration as AppConfiguration } from '@/types/config';
import { generateReviewComments } from '@/helpers/openai';
import { parseDiff, getFileContent, shouldReviewFile } from './file';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function reviewPullRequest(context: Context<'pull_request'>, pr: any, config: AppConfiguration) {
	const { owner, repo } = context.repo();

	const diffResponse = await context.octokit.pulls.get({
		owner,
		repo,
		pull_number: pr.number,
		mediaType: {
			format: 'diff',
		},
	});

	const diff = diffResponse.data as unknown as string;

	const fileDiffs = parseDiff(diff);

	for (const fileDiff of fileDiffs) {
		if (!shouldReviewFile(fileDiff.newCode.split('\n').length, fileDiff.filePath, pr.base.ref, config)) {
			console.log('Skipping file:', fileDiff.filePath);

			continue;
		}

		fileDiff.entireFile = await getFileContent(context, fileDiff.filePath, pr.head.sha);
		fileDiff.reviewComment = await generateReviewComments(fileDiff.originalCode, fileDiff.newCode, fileDiff.entireFile, config);
	}

	console.log('All file diffs with review comments:', fileDiffs);

	const reviewComments = fileDiffs
		.filter((fileDiff) => fileDiff.reviewComment)
		.map((fileDiff) => ({
			path: fileDiff.filePath,
			line: fileDiff.lineEnd,
			side: 'RIGHT',
			body: fileDiff.reviewComment ?? 'NO REVIEW COMMENT',
		}));

	if (reviewComments.length > 0) {
		console.log('Review comments to be posted:');
		console.log(JSON.stringify(reviewComments, null, 2));

		try {
			const response = await context.octokit.pulls.createReview({
				owner: context.repo().owner,
				repo: context.repo().repo,
				pull_number: pr.number,
				event: 'COMMENT',
				comments: reviewComments,
			});

			console.log('Review comments posted successfully. Response status:', response.status);
		} catch (error) {
			console.error('Error posting review comments:', error);
		}
	} else {
		console.log('No review comments to post.');
	}
}
