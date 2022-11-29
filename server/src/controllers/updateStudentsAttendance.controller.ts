import { Request, Response } from 'express';

import debug from 'debug';
import {
  Attendance as AttendanceSchema,
  Session as SessionSchema,
  User as UserSchema,
} from '../database';
import { BadRequestError } from '../errors';
import { Attendance, Session, Student, User } from '../models';

const logger = debug('backend:update.student.attendance.controller');

export const updateStudentsAttendanceController = async (
  req: Request,
  res: Response
) => {
  const { sessionId, studentId, date } = req.body;

  const attendanceRecord = await AttendanceSchema.findOne({
    where: {
      session_id: sessionId,
      user_id: studentId,
    },
  });

  if (!attendanceRecord) {
    logger('attendance not found');
    throw new BadRequestError('Attendance record not found');
  }

  const sessionRecord = await SessionSchema.findByPk(sessionId);

  const session = new Session({
    id: sessionRecord!.dataValues.session_id,
    type: sessionRecord!.dataValues.session_type_id,
    moduleId: sessionRecord!.dataValues.module_id,
    startTimestamp: sessionRecord!.dataValues.start_timestamp,
    endTimestamp: sessionRecord!.dataValues.end_timestamp,
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
