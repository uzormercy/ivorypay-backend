import { loginUser } from '@app/resources/users/user.service';
import { Request, Response } from 'express';
import { respond } from '@app/utils/respond';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser({ email, password });
  return respond({ status: user.status, title: user.title, message: user.message, entity: user.entity })(res);
};
