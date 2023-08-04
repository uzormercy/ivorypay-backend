import { use } from '@app/utils/errors';
import { Router } from 'express';
import { login, updateProfile } from '@app/resources/users/user.controller';
const router = Router();

router.post('/login', use(login));
router.put('/profile/:id', use(updateProfile));

export default router;
