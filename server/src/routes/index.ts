// create routes
export { createBulkUserRouter } from './createBulkUser.route';
export { createBulkModulesRouter } from './createBulkModules.route';
export { createUserRouter } from './createUser.route';

// get routes
export { getModuleRouter } from './getModule.route';
export { getSessionRouter } from './getSession.route';
export { getTutorSessionsRouter } from './getTutorSessions.route';
export { getUserRouter } from './getUser.route';
export { getUserAttendanceRouter } from './getUserAttendance.route';
export { getUserModuleAttendanceRouter } from './getUserModuleAttendance.router';
export { getAllUsersRouter } from './getAllUsers.route';
export { getUserCoursesRouter } from './getUserCourses.route';

// custom routes
export { registerAttendanceRouter } from './registerAttendance.route';
export { resetPasswordUserRouter } from './resetPasswordUser.route';
export { deleteAdvisorRouter } from './deleteAdvisor.route';
export * from './courses.router';

// update routes
export { updateStudentsAttendanceRouter } from './updateStudentsAttendance.route';
export { updateUserRouter } from './updateUser.route';
