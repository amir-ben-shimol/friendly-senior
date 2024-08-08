module.exports = {
	root: true,
	env: {
		node: true,
		jest: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'prettier'],
	reportUnusedDisableDirectives: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'unused-imports', 'import', 'deprecation', 'unicorn', 'jsx-a11y', 'react', 'react-hooks', 'i18next'],
	rules: {
		'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
		'quotes': ['error', 'single', { avoidEscape: true }],
		'semi': ['error', 'always'],
		'no-empty': [
			'error',
			{
				allowEmptyCatch: true,
			},
		],
		'no-duplicate-imports': 'error',
		'no-promise-executor-return': 'error',
		'no-self-compare': 'error',
		'no-template-curly-in-string': 'error',
		'no-unreachable-loop': 'error',
		'no-multiple-empty-lines': 'error',
		'no-trailing-spaces': 'error',
		'require-await': 'error',
		'no-var': 'error',
		'no-labels': 'error',
		'eqeqeq': 'error',
		'no-eval': 'error',
		'no-implicit-globals': 'error',
		'no-useless-call': 'error',
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: [
					'import',

					'let',
					'const',
					'var',

					'return',
					'throw',
					'if',
					'for',
					'switch',
					'continue',
					'break',
					'class',
					'do',
					'try',
					'export',
					'function',
					'while',
					'block',
				],
				next: '*',
			},
			{
				blankLine: 'any',
				prev: ['singleline-let', 'singleline-const', 'singleline-var'],
				next: ['singleline-let', 'singleline-const', 'singleline-var'],
			},
			{
				blankLine: 'any',
				prev: 'import',
				next: 'import',
			},
			{
				blankLine: 'always',
				prev: '*',
				next: ['return', 'throw', 'if', 'for', 'switch', 'continue', 'break', 'class', 'do', 'try', 'export', 'function', 'while', 'block'],
			},
		],
		'no-restricted-imports': [
			'error',
			{
				name: 'lodash',
				message: 'The year is not 2015 anymore',
			},
		],

		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': ['error'],
		'@typescript-eslint/ban-ts-comment': ['error'],
		'@typescript-eslint/ban-tslint-comment': ['error'],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/consistent-type-imports': ['error'],
		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/explicit-member-accessibility': ['error'],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'typeLike',
				format: ['PascalCase'],
			},
		],

		'unused-imports/no-unused-imports': 'error',

		'import/default': ['error'],
		'import/no-absolute-path': ['error'],
		'import/no-self-import': ['error'],
		'import/no-cycle': ['error'],
		'import/no-useless-path-segments': ['error'],
		'import/export': ['error'],
		'import/no-extraneous-dependencies': ['error'],
		'import/no-mutable-exports': ['error'],
		'import/no-unused-modules': ['error'],
		'import/no-commonjs': ['error'],
		'import/no-amd': ['error'],
		'import/first': ['error'],
		'import/no-duplicates': ['error'],
		'import/newline-after-import': ['error'],
		'import/no-named-default': ['error'],
		'import/no-anonymous-default-export': ['error'],
		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: '@/**',
						group: 'external',
						position: 'after',
					},
				],
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
			},
		],

		'deprecation/deprecation': 'error',

		'unicorn/catch-error-name': 'error',
		'unicorn/new-for-builtins': 'error',
		'unicorn/prefer-node-protocol': 'error',
		'unicorn/no-new-buffer': 'error',
		'unicorn/throw-new-error': 'error',
		'unicorn/text-encoding-identifier-case': 'error',
		'unicorn/switch-case-braces': 'error',
		'unicorn/no-empty-file': 'error',

		'jsx-quotes': ['error', 'prefer-double'],

		'jsx-a11y/alt-text': 'error',
		'jsx-a11y/html-has-lang': 'error',
		'jsx-a11y/img-redundant-alt': ['error'],
		'jsx-a11y/lang': 'error',
		'jsx-a11y/no-redundant-roles': 'error',

		'react/jsx-indent': 'off',
		'react/jsx-fragments': 'error',
		'react/jsx-wrap-multilines': [
			'error',
			{
				declaration: 'parens-new-line',
				assignment: 'parens-new-line',
				return: 'parens-new-line',
				arrow: 'parens-new-line',
				condition: 'parens-new-line',
				logical: 'parens-new-line',
				prop: 'parens-new-line',
			},
		],
		'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
		'react/jsx-sort-props': ['error', { callbacksLast: true, noSortAlphabetically: true }],
		'react/jsx-props-no-multi-spaces': 'error',
		'react/jsx-pascal-case': 'error',
		'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
		'react/jsx-no-useless-fragment': 'error',
		'react/jsx-no-script-url': 'error',
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-equals-spacing': ['error', 'never'],
		'react/jsx-curly-spacing': ['error', { when: 'never', children: { when: 'never' } }],
		'react/jsx-closing-tag-location': 'error',
		'react/jsx-closing-bracket-location': 'error',
		'react/jsx-boolean-value': ['error', 'never'],
		'react/self-closing-comp': 'error',
		'react/void-dom-elements-no-children': 'error',
		'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
		'react/button-has-type': 'error',
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/no-children-prop': ['error'],
		'react/no-deprecated': ['error'],
		'react/no-danger-with-children': ['error'],
		'react/no-unescaped-entities': ['error'],
		'react/no-unknown-property': ['error'],
		'react/prefer-read-only-props': ['error'],
		'react/jsx-handler-names': ['error', { eventHandlerPrefix: false }],
		'react/jsx-key': ['error', { checkKeyMustBeforeSpread: true }],
		'react/jsx-max-depth': ['error', { max: 10 }],
		'react/jsx-no-duplicate-props': ['error'],

		'react-hooks/rules-of-hooks': ['error'],
	},
	overrides: [
		{
			files: ['inflint.config.cjs'],
			rules: {
				'import/no-commonjs': 'off',
			},
		},
		{
			files: ['./lint-staged.config.cjs'],
			rules: {
				'unicorn/no-empty-file': 'off',
				'import/no-commonjs': 'off',
			},
		},
		{
			files: ['./release.config.cjs'],
			rules: {
				'unicorn/no-empty-file': 'off',
				'import/no-commonjs': 'off',
			},
		},
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
};
