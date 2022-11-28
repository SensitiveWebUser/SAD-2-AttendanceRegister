import { Request, Response } from 'express';

export const resetPasswordController = async (req: Request, res: Response) => {
  res.status(200).send();
};
