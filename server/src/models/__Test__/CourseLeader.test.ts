import { CourseLeader } from '../CourseLeader';

const courseLeaderTestData = {
  id: 1,
  type: 4,
  firstName: 'John',
  middleName: 'A',
  lastName: 'Smith',
  email: 'JohnSmith@localhost.com',
  sessionList: {},
  course: 1,
};

const _courseLeader = new CourseLeader(
  courseLeaderTestData.id,
  courseLeaderTestData.type,
  courseLeaderTestData.firstName,
  courseLeaderTestData.middleName,
  courseLeaderTestData.lastName,
  courseLeaderTestData.email,
  courseLeaderTestData.sessionList,
  courseLeaderTestData.course
);

describe('CourseLeader model', () => {
  it('has a module', () => {
    expect(_courseLeader).toBeDefined();
  });
});

// Test courseLeader getter and setter methods
describe('CourseLeader model getter and setter methods', () => {
  it('getCourse method returns the correct course', () => {
    expect(_courseLeader.getCourse()).toEqual(courseLeaderTestData.course);
  });
});
