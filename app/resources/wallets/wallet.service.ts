import { AppDataSource } from '@app/config/database';
import { Wallet } from '@app/resources/wallets/wallet.entity';
import { v4 as uuid } from 'uuid';

const walletRepository = AppDataSource.getRepository(Wallet);

export const createUserWallet = async (user: any): Promise<Wallet | any> => {
  return walletRepository.create({ id: uuid(), user: user.id });
};
