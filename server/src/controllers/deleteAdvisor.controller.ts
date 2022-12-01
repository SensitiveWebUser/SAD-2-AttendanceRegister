import { Request, Response } from 'express';

import { debug } from 'debug';
import { Op } from 'sequelize';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import {
  AdvisorStudentLink as AdvisorStudentLinkSchame,
  User as UserSchema,
  UserType as UserTypeSchema,
} from '../database';
import { BadRequestError } from '../errors';

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

  if (!advisorTypeRecord) {
    logger('user is not an academic advisor');
    throw new BadRequestError('user is not an academic advisor');
  }

  if (advisorTypeRecord.user_type_name !== userTypeEnum.ACADEMIC_ADVISOR) {
    logger('user is not an academic advisor');
    throw new BadRequestError('user is not an academic advisor');
  }

  const advieeRecords = await AdvisorStudentLinkSchame.findAll({
    where: {
      advisor_id: id,
    },
  });

  //Find advieeRecords where advisor_id does not equal id
  const otherAdvieeRecords = await AdvisorStudentLinkSchame.findAll({
    where: {
      advisor_id: {
        [Op.ne]: id,
      },
    },
  });

  logger('advieeRecords', advieeRecords);

  const otherAdvieeIds = otherAdvieeRecords.map((record) => record.student_id);

  logger('otherAdvieeIds', otherAdvieeIds);

  advieeRecords.map(async (advieeRecord) => {
    //Sets the advisor_id to a random advisor from the otherAdvieeRecords
    advieeRecord.advisor_id =
      otherAdvieeIds[Math.floor(Math.random() * otherAdvieeIds.length)];
  });

  advisorRecord.destroy();

  res.status(200).send();
};
