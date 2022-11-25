//like student

import { AcademicAdvisor } from '../AcademicAdvisor';

import { userTestData } from './userTestData';

const academicAdvisorTestData = {
  ...userTestData,
  adviserList: [],
};

const _academicAdvisor = new AcademicAdvisor(academicAdvisorTestData);

describe('AcademicAdvisor model', () => {
  it('has a module', () => {
    expect(_academicAdvisor).toBeDefined();
  });
});

//TODO: Add data into database and test the methods
/*
// Test academicAdvisor getter and setter methods
describe('AcademicAdvisor model getter and setter methods', () => {
  it('getAdviseeList method returns the correct adviseeList', () => {
    expect(_academicAdvisor.getAdviseeList()).toEqual(
      academicAdvisorTestData.adviserList
    );
  });
});
*/
