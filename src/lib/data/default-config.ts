import type { Configuration } from '@/types/config';

export const defaultConfig: Configuration = {
	targetBranch: 'main',
	techKeywords: ['TypeScript', 'React', 'Node.js'],
	minLinesChanged: 1,
	maxLinesChanged: 100,
	includeFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'yml'],
	excludeFileExtensions: ['md', 'json'],
	excludeFiles: ['package.json', 'pnpm-lock.yaml', 'yarn.lock', 'package-lock.json', 'node_modules', 'dist'],
	enableDetailedExplanations: false,
};
