//like student

import { AcademicAdvisor } from '../AcademicAdvisor';

const academicAdvisorTestData = {
  id: 1,
  type: 1,
  firstName: 'John',
  middleName: 'A',
  lastName: 'Smith',
  email: '',
  sessionList: {},
  adviserList: [],
};

const _academicAdvisor = new AcademicAdvisor(
  academicAdvisorTestData.id,
  academicAdvisorTestData.type,
  academicAdvisorTestData.firstName,
  academicAdvisorTestData.middleName,
  academicAdvisorTestData.lastName,
  academicAdvisorTestData.email,
  academicAdvisorTestData.sessionList,
  academicAdvisorTestData.adviserList
);

describe('AcademicAdvisor model', () => {
  it('has a module', () => {
    expect(_academicAdvisor).toBeDefined();
  });
});

// Test academicAdvisor getter and setter methods
describe('AcademicAdvisor model getter and setter methods', () => {
  it('getAdviseeList method returns the correct adviseeList', () => {
    expect(_academicAdvisor.getAdviseeList()).toEqual(
      academicAdvisorTestData.adviserList
    );
  });
});
