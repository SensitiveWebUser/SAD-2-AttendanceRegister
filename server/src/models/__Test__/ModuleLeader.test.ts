import { ModuleLeader } from '../ModuleLeader';

const moduleLeaderTestData = {
  id: 1,
  type: 1,
  firstName: 'John',
  middleName: 'A',
  lastName: 'Smith',
  email: 'JohnSmith@localhost.com',
  sessionList: {},
  module: 'CS1234',
};

const _moduleLeader = new ModuleLeader(
  moduleLeaderTestData.id,
  moduleLeaderTestData.type,
  moduleLeaderTestData.firstName,
  moduleLeaderTestData.middleName,
  moduleLeaderTestData.lastName,
  moduleLeaderTestData.email,
  moduleLeaderTestData.sessionList,
  moduleLeaderTestData.module
);

describe('ModuleLeader', () => {
  it('has a module', () => {
    expect(ModuleLeader).toBeDefined();
  });
});

// Test module leader getter and setter methods
describe('ModuleLeader model getter and setter methods', () => {
  it('getModule method returns the correct module', () => {
    expect(_moduleLeader.getModule()).toEqual(moduleLeaderTestData.module);
  });
});
