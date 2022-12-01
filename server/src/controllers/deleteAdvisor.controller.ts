import { Request, Response } from 'express';

import { debug } from 'debug';
import { Op } from 'sequelize';
import { userTypeEnum } from '../utils/userTypeEnum';
import {
  AdvisorStudentLink as AdvisorStudentLinkSchema,
  User as UserSchema,
  UserType as UserTypeSchema,
} from '../database';
import { BadRequestError } from '../errors';
import managementClient from '../utils/managementClient';

const logger = debug('backend:delete.advisor.controller');

export const deleteAdvisorController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const advisorRecord = await UserSchema.findByPk(id);

  if (!advisorRecord) {
    logger('user does not exist');
    throw new BadRequestError('user does not exist');
  }

  const advisorTypeRecord = await UserTypeSchema.findByPk(
    advisorRecord.user_type_id
  );

  if (advisorTypeRecord!.user_type_name !== userTypeEnum.ACADEMIC_ADVISOR) {
    logger('user is not an academic advisor');
    throw new BadRequestError('user is not an academic advisor');
  }

  const adviseeRecords = await AdvisorStudentLinkSchema.findAll({
    where: {
      advisor_id: id,
    },
  });

  //Find adviseeRecords where advisor_id does not equal id
  const otherAdvisorRecords = await AdvisorStudentLinkSchema.findAll({
    where: {
      advisor_id: {
        [Op.ne]: id,
      },
    },
  });

  logger('adviseeRecords', adviseeRecords);

  const otherAdvieeIds = otherAdvisorRecords.map((record) => record.advisor_id);

  logger('otherAdvieeIds', otherAdvieeIds);

  for (const adviseeRecord of adviseeRecords) {
    const studentId = adviseeRecord.dataValues.student_id;
    const otherAdvisorId =
      otherAdvieeIds[Math.floor(Math.random() * otherAdvieeIds.length)];
    await adviseeRecord.destroy();
    await AdvisorStudentLinkSchema.build({
      advisor_id: otherAdvisorId,
      student_id: studentId,
    }).save();
  }

  await managementClient.deleteUser({ id: id });

  await advisorRecord.destroy();

  res.status(200).send();
};
