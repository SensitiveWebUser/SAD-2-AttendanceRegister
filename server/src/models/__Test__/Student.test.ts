import { userTestData } from './userTestData';
import { Student } from '@Models';

const studentTestData = {
  ...userTestData,
  courseId: '1',
};

const _student = new Student(studentTestData);

describe('Student model', () => {
  it('has a module', () => {
    expect(_student).toBeDefined();
  });
});
