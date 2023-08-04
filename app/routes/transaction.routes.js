import { Router } from 'express';
import { makeTransaction } from '@app/resources/transactions/transaction.controller';
import { use } from '@app/utils/errors';
import authorized from '@app/middlewares/authentication.middleware';
const router = Router();
router.post('/deposit', authorized, use(makeTransaction));
router.post('/transfer', authorized, use(makeTransaction));
router.post('/withdraw', authorized, use(makeTransaction));
export default router;
