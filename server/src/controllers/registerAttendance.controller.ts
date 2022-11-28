import { Request, Response } from 'express';

export const registerAttendanceController = async (
  req: Request,
  res: Response
) => {
  res.status(200).send();
};
