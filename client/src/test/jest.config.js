const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig.json');

const paths = compilerOptions.paths ? compilerOptions.paths : {};

module.exports = {
  rootDir: '../',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/cypress/'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
};
