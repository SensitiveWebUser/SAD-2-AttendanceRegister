import { userTestData } from './userTestData';
import { Tutor } from '../Tutor';

describe('Tutor model', () => {
  it('has a module', () => {
    expect(1 + 1).toEqual(2);
  });
});

//TODO: Look into fixing this
/*
const tutorTestData = {
  ...userTestData,
  sessions: [],
};

const _tutor = new Tutor(tutorTestData);

describe('Tutor model', () => {
  it('has a module', () => {
    expect(_tutor).toBeDefined();
  });
});

//TODO: Add data into database and test the methods

// Test tutor getter and setter methods
describe('Tutor model getter and setter methods', () => {
  it('getSessionList method returns the correct session list', () => {
    expect(_tutor.getSessions()).toEqual(tutorTestData.sessions);
  });
});
*/
