import * as yup from 'yup';
export const fundWalletSchema = yup.object().shape({
  userId: yup.string().required('User is mandatory'),
  amount: yup.string().required('Amount is mandatory'),
});

export const transferFromWalletSchema = yup.object().shape({
  userId: yup.string().required('User is mandatory'),
  amount: yup.string().required('Amount is mandatory'),
  email: yup.string().required('Recipient email is mandatory'),
  password: yup.string().required('Password is mandatory'),
});

export const withdrawFromWalletSchema = yup.object().shape({
  userId: yup.string().required('User is mandatory'),
  amount: yup.string().required('Amount is mandatory'),
  localAccountNumber: yup.string().required('Account Number email is mandatory'),
  bank: yup.string().required('Bank is mandatory'),
  password: yup.string().required('Password is mandatory'),
});
