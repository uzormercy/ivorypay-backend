import { loginUserDtoInterface, updateUserDtoInterface } from '@app/resources/users/user.interfaces';
import validator from '@app/utils/validator';
import { loginSchema, updateUserSchema } from '@app/resources/users/dto/updateUserSchema';
import { failResult, returnResult } from '@app/utils/respond';
import { AppDataSource } from '@app/config/database';
import { User } from '@app/resources/users/user.entity';
import * as bcrypt from 'bcrypt';
import { generateToken } from '@app/utils/token';

const userRepository = AppDataSource.getRepository(User);

export const loginUser = async (loginUserDto: loginUserDtoInterface): Promise<any> => {
  const validated = await validator(loginSchema)(loginUserDto);
  if (!validated.type) return failResult(validated.error);
  const user = await userRepository.findOneBy({ email: validated.email });
  if (user === null) return failResult('Please request for an invite from the admin');
  const token = await generateToken({ id: user.id, fullName: `${user.firstname} ${user.lastname}`, email: user.email });
  const { password, ...userDetails } = user;
  return returnResult(true, {
    status: 200,
    title: 'Authentication',
    message: 'login successfully',
    entity: { ...userDetails, token },
  });
};
export const updateUserProfile = async (updateUserDto: updateUserDtoInterface, id: string): Promise<any> => {
  const userValidator = await validator(updateUserSchema)(updateUserDto);
  if (!userValidator.type) return failResult(userValidator.error);
  const user = await userRepository.findOneBy({ id });
  if (user === null) return failResult('Unprocessed entity');
  user.firstname = updateUserDto.firstname;
  user.lastname = updateUserDto.lastname;
  user.password = await bcrypt.hash(updateUserDto.password, 10);
  const updatedUser = await userRepository.save(user);
  const { password, ...userDetails } = updatedUser;
  return returnResult(true, {
    status: 200,
    title: 'Profile updated',
    message: 'Profile updated successfully',
    entity: userDetails,
  });
};
