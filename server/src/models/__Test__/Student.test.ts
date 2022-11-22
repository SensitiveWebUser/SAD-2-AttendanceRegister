import { Student } from '@Models';

const studentTestData = {
  id: 1,
  type: 1,
  firstName: 'John',
  middleName: 'A',
  lastName: 'Smith',
  email: 'JohnSmith@localhost.com',
  advisor: 1,
  _attendanceData: {},
};

const _student = new Student(
  studentTestData.id,
  studentTestData.type,
  studentTestData.firstName,
  studentTestData.middleName,
  studentTestData.lastName,
  studentTestData.email,
  studentTestData.advisor,
  studentTestData._attendanceData
);

describe('Student model', () => {
  it('has a module', () => {
    expect(_student).toBeDefined();
  });
});

// Test student getter and setter methods
describe('Student model getter and setter methods', () => {
  it('getAttendanceData method returns the correct attendance data', () => {
    expect(_student.getAttendanceData()).toEqual(
      studentTestData._attendanceData
    );
  });

  it('getAdvisor method returns the correct advisor', () => {
    expect(_student.getAdvisor()).toEqual(studentTestData.advisor);
  });
});
