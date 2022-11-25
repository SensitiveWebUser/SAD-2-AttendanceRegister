import { CourseLeader } from '../CourseLeader';

import { userTestData } from './userTestData';

const courseLeaderTestData = {
  ...userTestData,
  courseId: '1',
};

const _courseLeader = new CourseLeader(courseLeaderTestData);

describe('CourseLeader model', () => {
  it('has a module', () => {
    expect(_courseLeader).toBeDefined();
  });
});

// Test courseLeader getter and setter methods
describe('CourseLeader model getter and setter methods', () => {
  it('getCourse method returns the correct course', () => {
    expect(_courseLeader.getCourseId()).toEqual(courseLeaderTestData.courseId);
  });
});
