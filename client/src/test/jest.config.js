import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from '../tsconfig.json';

const paths = compilerOptions.paths ? compilerOptions.paths : {};

export const rootDir = '../';
export const setupFilesAfterEnv = ['<rootDir>/test/jest.setup.ts'];
export const testPathIgnorePatterns = [
  '<rootDir>/node_modules/',
  '<rootDir>/cypress/',
];
export const moduleNameMapper = {
  ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
  '\\.(scss|sass|css)$': 'identity-obj-proxy',
};
