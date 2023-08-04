import { Request, RequestHandler, Response } from 'express';
import { processTransaction } from '@app/resources/transactions/transaction.service';
import { CustomRequest, PayLoad, TransactionTypes } from '@app/resources/transactions/transaction.types';
import { respond } from '@app/utils/respond';

export const makeTransaction = async (req: CustomRequest, res: Response): Promise<any> => {
  const url = req.originalUrl;
  const urlSegments = url.split('/');
  const userId = req.user.id;
  const data = { userId, ...req.body };
  const transactionType: TransactionTypes | any = urlSegments.pop() || TransactionTypes.UNKNOWN;
  const transaction = await processTransaction(data, transactionType);
  return respond({ message: transaction.message, title: transaction.title, status: transaction.status })(res);
};
