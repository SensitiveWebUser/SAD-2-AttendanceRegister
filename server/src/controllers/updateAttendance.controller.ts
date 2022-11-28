import { Request, Response } from 'express';

import { Session, User, Student } from '../models';
import {
  User as UserSchema,
  AdvisorStudentLink as AdvisorStudentLinkSchema,
  Session as SessionSchema,
} from '../database';
import { BadRequestError, NotFoundError } from '../errors';

export const updateAttendanceController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { sessionId, code } = req.body;

  const userRecord = await UserSchema.findByPk(id);

  if (!userRecord) throw new BadRequestError('Student not found');

  const academicAdvisorRecord = await AdvisorStudentLinkSchema.findOne({
    where: {
      student_id: userRecord!.dataValues.user_id,
    },
  });

  console.log('session id: ', sessionId);

  const student = new Student({
    userObject: new User({
      id: userRecord!.dataValues.user_id,
      type: userRecord!.dataValues.user_type_id,
      firstName: userRecord!.dataValues.first_name,
      middleName: userRecord!.dataValues.middle_name,
      lastName: userRecord!.dataValues.last_name,
      email: userRecord!.dataValues.email,
    }),
    academicAdvisorId: academicAdvisorRecord!.dataValues.academic_advisor_id,
  });

  const sessionRecord = await SessionSchema.findByPk(sessionId);

  if (!sessionRecord) throw new BadRequestError('Session not found');

  const session = new Session({
    id: sessionRecord!.dataValues.session_id,
    type: sessionRecord!.dataValues.session_type_id,
    moduleId: sessionRecord!.dataValues.module_id,
    startTimestamp: sessionRecord!.dataValues.start_timestamp,
    endTimestamp: sessionRecord!.dataValues.end_timestamp,
    code: sessionRecord!.dataValues.code,
  });

  const hasSetAttendance = await student.registerAttendanceAsync(session, code);

  if (!hasSetAttendance) throw new BadRequestError('Attendance can\'t be set');

  res.status(200).send();
};
