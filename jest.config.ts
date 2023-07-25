import type { Config } from 'jest';

const config: Config = {
  testTimeout: 5000,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  verbose: true,
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
