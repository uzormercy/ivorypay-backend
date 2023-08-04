import { User } from '@app/resources/users/user.entity';
import { AppDataSource } from '@app/config/database';
import { Admin } from '@app/resources/admin/admin.entity';
import { loginUserDtoInterface } from '@app/resources/users/user.interfaces';
import { loginSchema } from '@app/resources/users/dto/updateUserSchema';
import validator from '@app/utils/validator';
import { failResult, returnResult } from '@app/utils/respond';
import { generateToken } from '@app/utils/token';
import { v4 as uuid } from 'uuid';
import { Wallet } from '@app/resources/wallets/wallet.entity';
const adminRepository = AppDataSource.getRepository(Admin);
const userRepository = AppDataSource.getRepository(User);
const walletRepository = AppDataSource.getRepository(Wallet);

export const inviteUser = async (email: string) => {
  const id = uuid();
  const userData = {
    id,
    email,
  };
  const user = await userRepository.save(userData);
  if (!user) return failResult('Unable to invite user');
  await walletRepository.save({ id: uuid(), user });
  // TODO: send email notification to created user
  return returnResult(true, {
    status: 201,
    title: 'User',
    message: 'User created and invited successfully ',
  });
};

export const listUsers = async () => {
  const users = await userRepository.findAndCount();
  return returnResult(true, {
    status: 200,
    title: 'Users',
    message: 'Users gotten successfully',
    entity: {
      rows: users[0],
      count: users[1],
    },
  });
};

export const handleUserStatus = async (id: string): Promise<any> => {
  const user: User | null = await userRepository.findOneBy({ id });
  if (!user) return failResult('Something went wrong');
  user.status = !user.status;
  const updatedUser = await userRepository.save(user);
  const { password, ...userDetails } = updatedUser;
  return returnResult(true, {
    status: 200,
    title: 'User management',
    message: 'User status update successfully',
    entity: userDetails,
  });
};

export const loginAdmin = async (loginUserDto: loginUserDtoInterface): Promise<any> => {
  const validated = await validator(loginSchema)(loginUserDto);
  if (!validated.type) return failResult(validated.error);
  const admin: Admin | null = await adminRepository.findOneBy({ email: validated.email });
  if (admin === null) return failResult('Please request for an invite from the admin');
  const token = await generateToken({
    id: admin.id,
    fullName: `${admin.firstname} ${admin.lastname}`,
    email: admin.email,
  });
  const { password, ...adminDetails } = admin;
  return returnResult(true, {
    status: 200,
    title: 'Authentication',
    message: 'login successfully',
    entity: { ...adminDetails, token },
  });
};
