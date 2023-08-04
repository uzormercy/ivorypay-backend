import { loginUser, updateUserProfile } from '@app/resources/users/user.service';
import { Request, Response } from 'express';
import { respond } from '@app/utils/respond';
import { updateUserDtoInterface } from '@app/resources/users/user.interfaces';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser({ email, password });
  return respond({ status: user.status, title: user.title, message: user.message, entity: user.entity })(res);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname, password, confirmPassword }: updateUserDtoInterface = req.body;
  const user = await updateUserProfile({ firstname, lastname, password, confirmPassword }, id);
  return respond({
    status: user.status,
    title: user.title,
    message: user.message,
    entity: user.entity,
  })(res);
};
