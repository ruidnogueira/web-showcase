module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: ['./setupTests.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/../src/$1',
  },
  moduleDirectories: ['../node_modules', '.'],
};
