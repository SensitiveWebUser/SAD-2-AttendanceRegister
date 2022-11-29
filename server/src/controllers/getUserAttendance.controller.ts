import { Request, Response } from 'express';

import debug from 'debug';
import {
  Attendance as AttendanceSchema,
  Session as SessionSchema,
  User as UserSchema,
} from '../database';
import { BadRequestError } from '../errors';
import { Attendance, Session, Student, User } from '../models';

const logger = debug('backend:get.user.attendance.controller');

export const getUserAttendanceController = async (
  req: Request,
  res: Response
) => {
  const { id, sessionId } = req.params;

  const studentRecord = await UserSchema.findByPk(id);
  const attendanceRecord = await AttendanceSchema.findOne({
    where: { user_id: id, session_id: sessionId },
  });
  const sessionRecord = await SessionSchema.findByPk(sessionId);

  if (!studentRecord) {
    logger('student not found');
    throw new BadRequestError('Student not found');
  }
  if (!sessionRecord) {
    logger('session not found');
    throw new BadRequestError('Session not found');
  }
  if (!attendanceRecord) {
    logger('attendance not found');
    throw new BadRequestError('Attendance not found');
  }

  const session = new Session({
    id: sessionRecord.session_id as string,
    type: sessionRecord.session_type_id,
    moduleId: sessionRecord.module_id,
    startTimestamp: sessionRecord.start_timestamp,
    endTimestamp: sessionRecord.end_timestamp,
    code: sessionRecord.code,
  });

  const student = new Student({
    userObject: new User({
      id: studentRecord.dataValues.user_id,
      type: studentRecord.dataValues.user_type_id,
      firstName: studentRecord.dataValues.first_name,
      middleName: studentRecord.dataValues.middle_name,
      lastName: studentRecord.dataValues.last_name,
      email: studentRecord.dataValues.email,
    }),
    academicAdvisorId: studentRecord.dataValues.academic_advisor_id,
  });

  const attendance = new Attendance({
    student,
    session,
    attended: attendanceRecord.dataValues.attended,
  });

  res.status(200).send(await attendance.toJsonAsync());
};
