import { TransactionTypes } from '@app/resources/transactions/transaction.types';
import validator from '@app/utils/validator';
import {
  fundWalletSchema,
  transferFromWalletSchema,
  withdrawFromWalletSchema,
} from '@app/resources/transactions/dto/transaction.dto';
import { failResult, returnResult } from '@app/utils/respond';
import { AppDataSource } from '@app/config/database';
import { User } from '@app/resources/users/user.entity';
import { Wallet } from '@app/resources/wallets/wallet.entity';
import { Transaction } from '@app/resources/transactions/transaction.entity';
import * as bcrypt from 'bcrypt';

const userRepository = AppDataSource.getRepository(User);
const walletRepository = AppDataSource.getRepository(Wallet);
const transactionRepository = AppDataSource.getRepository(Transaction);
export const storeTransaction = async (transactionType: TransactionTypes, transactionData: any): Promise<any> => {
  const user = await userRepository.findOne({ where: { id: transactionData.userId }, relations: ['wallet'] });
  if (!user) return failResult('Something went wrong');
  switch (transactionType) {
    case TransactionTypes.TRANSFER || TransactionTypes.WITHDRAW:
      if (Number(user.wallet.balance) < Number(transactionData.amount)) return failResult('Insufficient funds');
      user.wallet.balance -= transactionData.amount;
      const comparePassword = await bcrypt.compare(transactionData.password, user.password);
      if (!comparePassword) return failResult('Unauthorized to make this transaction');
      await transactionRepository.save({ type: transactionType, ...transactionData });
      await walletRepository.save(user.wallet);
      break;
    case TransactionTypes.DEPOSIT:
      user.wallet.balance += transactionData.amount;
      await transactionRepository.save({ type: transactionType, ...transactionData });
      await walletRepository.save(user.wallet);
      break;
    default:
      return failResult('Something went wrong');
  }
  return returnResult(true, {
    status: 200,
    title: 'Transaction',
    message: 'Transaction is processing',
  });
};

export const processTransaction = async (fundingData: any, transactionType: TransactionTypes | any): Promise<any> => {
  await validateTransactionData(fundingData, transactionType);

  const transaction = await storeTransaction(transactionType, fundingData);
  if (!transaction.type) return failResult('Something went wrong');
  return returnResult(true, {
    status: transaction.status,
    title: transaction.title,
    message: transaction.message,
  });
};

const validateTransactionData = async (fundingData: any, transactionType: TransactionTypes | any) => {
  let validateData;
  const allowedTransactionTypes = Object.values(TransactionTypes);
  if (!allowedTransactionTypes.includes(transactionType)) return failResult('Unknown transaction type');
  switch (transactionType) {
    case TransactionTypes.DEPOSIT:
      validateData = await validator(fundWalletSchema)(fundingData);
      break;
    case TransactionTypes.TRANSFER:
      validateData = await validator(transferFromWalletSchema)(fundingData);
      break;
    case TransactionTypes.WITHDRAW:
      validateData = await validator(withdrawFromWalletSchema)(fundingData);
      break;
  }
  if (!validateData.type) return failResult(validateData.error);
  return validateData;
};
