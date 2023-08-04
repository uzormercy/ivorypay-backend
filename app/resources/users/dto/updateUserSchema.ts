import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { loginUserDtoInterface, updateUserDtoInterface } from '@app/resources/users/user.interfaces';
export const updateUserSchema: ObjectSchema<updateUserDtoInterface> = yup.object().shape({
  firstname: yup.string().required('Firstname is mandatory'),
  lastname: yup.string().required('Lastname is mandatory'),
  password: yup.string().required('Password is mandatory'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must match'),
});

export const loginSchema: ObjectSchema<loginUserDtoInterface> = yup.object().shape({
  email: yup.string().email().required('Email is mandatory'),
  password: yup.string().required('Password is mandatory'),
});
