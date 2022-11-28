import { Request, Response } from 'express';

import { Attendance, Session, User, Student } from '../models';
import {
  Attendance as AttendanceSchema,
  User as UserSchema,
  Session as SessionSchema,
} from '../database';
import { BadRequestError, NotFoundError } from '../errors';

export const updateStudentsAttendance = async (req: Request, res: Response) => {
  const { sessionId, studentId, date } = req.body;

  const attendanceRecord = await AttendanceSchema.findOne({
    where: {
      session_id: sessionId,
      user_id: studentId,
    },
  });

  if (!attendanceRecord) {
    throw new BadRequestError('Attendance record not found');
  }

  const sessionRecord = await SessionSchema.findByPk(sessionId);

  const session = new Session({
    id: sessionRecord!.dataValues.session_id,
    type: sessionRecord!.dataValues.session_type_id,
    moduleId: sessionRecord!.dataValues.module_id,
    startTimestamp: new Date(sessionRecord!.dataValues.start_timestamp),
    endTimestamp: new Date(sessionRecord!.dataValues.end_timestamp),
    code: sessionRecord!.dataValues.code,
  });

  const userRecord = await UserSchema.findByPk(studentId);

  const student = new Student({
    userObject: new User({
      id: userRecord!.dataValues.user_id,
      type: userRecord!.dataValues.user_type_id,
      firstName: userRecord!.dataValues.first_name,
      middleName: userRecord!.dataValues.middle_name,
      lastName: userRecord!.dataValues.last_name,
      email: userRecord!.dataValues.email,
    }),
    academicAdvisorId: userRecord!.dataValues.academic_advisor_id,
  });

  const attendance = new Attendance({
    student,
    session,
    attended: date,
  });

  await attendance.updateDatabaseAsync();

  res.status(200).json(attendance.toJsonAsync());
};
