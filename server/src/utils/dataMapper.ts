export const mapSession = (sessionRecord: Session) => {
  return {
    sessionId: sessionRecord.session_id,
    sessionTypeId: sessionRecord.session_type_id,
    tutorId: sessionRecord.tutor_id,
    moduleId: sessionRecord.module_id,
    startTimestamp: sessionRecord.start_timestamp,
    endTimestamp: sessionRecord.end_timestamp,
    code: sessionRecord.code,
  };
};

interface Session {
  session_id: string;
  session_type_id: string;
  tutor_id: string;
  module_id: string;
  start_timestamp: Date;
  end_timestamp: Date;
  code: string;
}

// Maps attendance schema to the Attendance model
export const mapAttendance = (attendanceRecord: Attendance) => {
  return {
    sessionId: attendanceRecord.session_id,
    studentId: attendanceRecord.student_id,
    timestamp: attendanceRecord.attended,
  };
};

interface Attendance {
  session_id: string;
  student_id: string;
  attended: number;
}

// Maps module schema to the Module model
export const mapModule = (moduleRecord: Module) => {
  return {
    moduleId: moduleRecord.module_id,
    moduleName: moduleRecord.module_name,
    moduleLeaderId: moduleRecord.module_leader_id,
  };
};

interface Module {
  module_id: string;
  module_name: string;
  module_leader_id: string;
}

// Maps user schema to the User models
export const mapUser = (userRecord: User) => {
  return {
    userId: userRecord.user_id,
    firstName: userRecord.first_name,
    middleName: userRecord.middle_name,
    lastName: userRecord.last_name,
    email: userRecord.email,
    userTypeId: userRecord.user_type_id,
  };
};

interface User {
  user_id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  user_type_id: string;
}
