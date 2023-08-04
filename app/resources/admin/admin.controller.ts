import { handleUserStatus, inviteUser, listUsers, loginAdmin } from '@app/resources/admin/admin.service';
import { Request, Response } from 'express';
import { respond } from '@app/utils/respond';
import { loginUserDtoInterface } from '@app/resources/users/user.interfaces';

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const user = await inviteUser(req.body.email);
  return respond({
    status: user.status,
    title: user.title,
    message: user.message,
  })(res);
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  const users = await listUsers();
  return respond({
    status: users.status,
    title: users.title,
    message: users.message,
    entity: users.entity,
  })(res);
};

export const enableDisableUser = async (req: Request, res: Response): Promise<any> => {
  const user = await handleUserStatus(req.body.id);
  return respond({
    status: user.status,
    title: user.title,
    message: user.message,
    entity: user.entity,
  })(res);
};

export const doAdminLogin = async (req: Request, res: Response) => {
  const { email, password }: loginUserDtoInterface = req.body;
  const admin = await loginAdmin({ email, password });
  return respond({
    status: admin.status,
    title: admin.title,
    message: admin.message,
    entity: admin.entity,
  })(res);
};
