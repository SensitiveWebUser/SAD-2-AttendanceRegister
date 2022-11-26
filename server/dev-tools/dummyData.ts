import {
  User,
  UserType,
  Course,
  Module,
  ModuleCourseLink,
  AdvisorStudentLink,
  SessionType,
  Session,
  Attendance,
} from '@Database';

const dummyData = {
  courses: [
    {
      course_id: '1',
      course_name: 'Course 1',
      course_leader_id: '1',
    },
  ],
  user_types: [
    {
      user_type_id: '1',
      user_type_name: 'Admin',
    },
    {
      user_type_id: '2',
      user_type_name: 'Student',
    },
    {
      user_type_id: '3',
      user_type_name: 'Tutor',
    },
    {
      user_type_id: '4',
      user_type_name: 'Module Leader',
    },
    {
      user_type_id: '5',
      user_type_name: 'Course Leader',
    },
    {
      user_type_id: '6',
      user_type_name: 'Advisor',
    },
  ],
  users: [
    {
      user_id: '1',
      first_name: 'John',
      middle_name: null,
      last_name: 'Doe',
      email: 'JohnDoe@localhost.com',
      user_type_id: '1',
    },
    {
      user_id: '2',
      first_name: 'John',
      middle_name: '2',
      last_name: 'Doe',
      email: 'JohnDoe2@localhost.com',
      user_type_id: '2',
    },
    {
      user_id: '3',
      first_name: 'John',
      middle_name: '3',
      last_name: 'Doe',
      email: 'JohnDoe3@localhost.com',
      user_type_id: '3',
    },
    {
      user_id: '4',
      first_name: 'John',
      middle_name: '4',
      last_name: 'Doe',
      email: 'JohnDoe4@localhost.com',
      user_type_id: '4',
    },
    {
      user_id: '5',
      first_name: 'John',
      middle_name: '5',
      last_name: 'Doe',
      email: 'JohnDoe5@localhost.com',
      user_type_id: '5',
    },
    {
      user_id: '6',
      first_name: 'John',
      middle_name: '6',
      last_name: 'Doe',
      email: 'JohnDoe6@localhost.com',
      user_type_id: '2',
    },
    {
      user_id: '7',
      first_name: 'John',
      middle_name: '7',
      last_name: 'Doe',
      email: 'JohnDoe7@localhost.com',
      user_type_id: '3',
    },
    {
      user_id: '8',
      first_name: 'John',
      middle_name: '8',
      last_name: 'Doe',
      email: 'JohnDoe8@localhost.com',
      user_type_id: '4',
    },
    {
      user_id: '9',
      first_name: 'John',
      middle_name: '9',
      last_name: 'Doe',
      email: 'JohnDoe9@localhost.com',
      user_type_id: '6',
    },
  ],
  advisor_student_links: [
    {
      advisor_id: '9',
      student_id: '2',
    },
    {
      advisor_id: '9',
      student_id: '6',
    },
  ],
  modules: [
    {
      module_id: '1',
      module_name: 'Module 1',
      module_leader_id: '4',
      course_id: '1',
    },
    {
      module_id: '2',
      module_name: 'Module 2',
      module_leader_id: '8',
      course_id: '1',
    },
  ],
  module_course_links: [
    {
      module_id: '1',
      course_id: '1',
    },
  ],
  session_types: [
    {
      session_type_id: '1',
      session_type_name: 'Lecture',
    },
    {
      session_type_id: '2',
      session_type_name: 'Lab',
    },
  ],
  sessions: [
    {
      session_id: '1',
      session_name: 'Session 1',
      session_type_id: '1',
      module_id: '1',
      tutor_id: '3',
      start_timestamp: new Date().getTime(),
      end_timestamp: new Date(new Date().getTime() + 60 * 60 * 1000).getTime(),
      code: '1234',
    },
    {
      session_id: '2',
      session_name: 'Session 2',
      session_type_id: '2',
      module_id: '2',
      tutor_id: '7',
      start_timestamp: new Date().getTime(),
      end_timestamp: new Date(new Date().getTime() + 60 * 60 * 1000).getTime(),
      code: 'asdf',
    },
  ],
  attendances: [
    {
      session_id: '1',
      user_id: '2',
      attended: 0,
    },
    {
      session_id: '1',
      user_id: '6',
      attended: 0,
    },
    {
      session_id: '2',
      user_id: '2',
      attended: 0,
    },
    {
      session_id: '2',
      user_id: '6',
      attended: 0,
    },
  ],
};

// Import dummy data into database
export const dummyDataImport = async () => {
  console.log('Importing dummy data...');

  // Imports user types into database
  await UserType.bulkCreate([...dummyData.user_types], { validate: true });

  // Imports users into database
  await User.bulkCreate([...dummyData.users], { validate: true });

  // Imports courses into database
  await Course.bulkCreate([...dummyData.courses], { validate: true });

  // Imports modules into database
  await Module.bulkCreate([...dummyData.modules], { validate: true });

  // Imports module-course links into database
  await ModuleCourseLink.bulkCreate([...dummyData.module_course_links], {
    validate: true,
  });

  // Imports advisor-student links into database
  await AdvisorStudentLink.bulkCreate([...dummyData.advisor_student_links], {
    validate: true,
  });

  // Imports session types into database
  await SessionType.bulkCreate([...dummyData.session_types], {
    validate: true,
  });

  // Imports sessions into database
  await Session.bulkCreate([...dummyData.sessions], { validate: true });

  // Imports attendances into database
  await Attendance.bulkCreate([...dummyData.attendances], { validate: true });
};
