import { Tutor } from '../Tutor';

const tutorTestData = {
  id: 1,
  type: 1,
  firstName: 'John',
  middleName: 'A',
  lastName: 'Smith',
  email: '',
  sessionList: {},
};

const _tutor = new Tutor(
  tutorTestData.id,
  tutorTestData.type,
  tutorTestData.firstName,
  tutorTestData.middleName,
  tutorTestData.lastName,
  tutorTestData.email,
  tutorTestData.sessionList
);

describe('Tutor model', () => {
  it('has a module', () => {
    expect(_tutor).toBeDefined();
  });
});

// Test tutor getter and setter methods
describe('Tutor model getter and setter methods', () => {
  it('getSessionList method returns the correct session list', () => {
    expect(_tutor.getSessions()).toEqual(tutorTestData.sessionList);
  });
});
