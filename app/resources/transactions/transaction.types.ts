import { Request } from 'express';

export enum TransactionTypes {
  DEPOSIT = 'deposit',
  TRANSFER = 'transfer',
  WITHDRAW = 'withdraw',
  UNKNOWN = 'unknown',
}

export type PayLoad = {
  id: string;
  fullName: string;
  email: string;
};

export interface CustomRequest extends Request {
  user: any;
}
