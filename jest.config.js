module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/$1',
	},
	testEnvironment: 'jsdom',
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.test.json',
			diagnostics: {
				warnOnly: true,
			},
		},
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
