import { Application, NextFunction, Request, RequestHandler, Response } from 'express';
import { CustomRequest } from '@app/resources/transactions/transaction.types';

export const validationError = (err: any) => {
  const errors = Object.values(err.errors).map(e => e);
  return { type: false, error: errors[0] };
};

export const use = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next);
};
