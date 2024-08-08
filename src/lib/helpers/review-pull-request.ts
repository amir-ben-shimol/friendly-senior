/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Context } from 'probot';
import type { Configuration as AppConfiguration } from '@/types/config';
import { generateReviewComments } from '@/helpers/openai';
import { parseDiff, getFileContent, shouldReviewFile } from './file';

export async function reviewPullRequest(context: Context<'pull_request'>, pr: any, config: AppConfiguration) {
	const { owner, repo } = context.repo();
	const pull_number = pr.number;

	// Create a check run
	const checkRun = await context.octokit.checks.create({
		owner,
		repo,
		name: 'FriendlySenior is reviewing your code',
		head_sha: pr.head.sha,
		status: 'in_progress',
		started_at: new Date().toISOString(),
	});

	const checkRunId = checkRun.data.id;

	const diffResponse = await context.octokit.pulls.get({
		owner,
		repo,
		pull_number,
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
				owner,
				repo,
				pull_number,
				event: 'COMMENT',
				comments: reviewComments,
			});

			console.log('Review comments posted successfully. Response status:', response.status);

			// Update the check run to completed
			await context.octokit.checks.update({
				owner,
				repo,
				check_run_id: checkRunId,
				conclusion: 'success',
				completed_at: new Date().toISOString(),
				output: {
					title: 'FriendlySenior Review Completed',
					summary: `Review comments have been posted successfully. Number of reviews commented: ${reviewComments.length}.`,
				},
			});
		} catch (error) {
			console.error('Error posting review comments:', error);

			// Update the check run to completed with failure
			await context.octokit.checks.update({
				owner,
				repo,
				check_run_id: checkRunId,
				conclusion: 'failure',
				completed_at: new Date().toISOString(),
				output: {
					title: 'Review Failed',
					summary: 'There was an error posting the review comments.',
					text: 'Error posting review comments',
				},
			});
		}
	} else {
		console.log('No review comments to post.');

		// Update the check run to completed with neutral conclusion
		await context.octokit.checks.update({
			owner,
			repo,
			check_run_id: checkRunId,
			conclusion: 'neutral',
			completed_at: new Date().toISOString(),
			output: {
				title: 'No Review Comments',
				summary: 'There were no review comments to post.',
			},
		});
	}
}
