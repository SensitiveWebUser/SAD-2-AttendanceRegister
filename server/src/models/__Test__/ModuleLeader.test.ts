import { userTestData } from './userTestData';
import { ModuleLeader } from '../ModuleLeader';

const moduleLeaderTestData = {
  ...userTestData,
};

const _moduleLeader = new ModuleLeader(moduleLeaderTestData);

describe('ModuleLeader', () => {
  it('has a module', () => {
    expect(ModuleLeader).toBeDefined();
  });
});

// Test module leader getter and setter methods
describe('ModuleLeader model getter and setter methods', () => {
  it('getModule method returns the correct module', () => {
    expect(_moduleLeader.getModuleId()).toEqual(moduleLeaderTestData.moduleId);
  });
});
