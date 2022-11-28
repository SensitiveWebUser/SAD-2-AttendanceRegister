import { Request, Response } from 'express';

import { Student, User } from '../models';
import { User as UserSchema } from '../database';
import { BadRequestError } from '../errors';

export const getUserModuleAttendanceController = async (
  req: Request,
  res: Response
) => {
  const { id, moduleId } = req.params;

  const studentRecord = await UserSchema.findByPk(id);

  if (!studentRecord) throw new BadRequestError('Student not found');

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

  res.status(200).send(await student.getAttendances(moduleId));
};
