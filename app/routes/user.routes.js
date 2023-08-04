import { use } from '@app/utils/errors';
import { Router } from 'express';
import { login } from '@app/resources/users/user.controller';
const router = Router();

router.post('/login', use(login));

export default router;
