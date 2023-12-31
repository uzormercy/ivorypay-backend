import { Express, Request, Response } from 'express';
import transactionRoutes from '@app/routes/transaction.routes';
import userRoutes from '@app/routes/user.routes';
import adminRoutes from '@app/routes/admin.routes';

const routes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => res.send({ status: 200, message: 'Welcome to IvoryPay' }));
  app.use('/auth', userRoutes);
  app.use('/admin', adminRoutes);
  app.use('/transactions', transactionRoutes);
  app.all('*', (req: Request, res: Response) =>
    res.status(404).send({
      status: 404,
      message: "Oops the url has been moved or doesn't exist",
    })
  );
};

export default routes;
