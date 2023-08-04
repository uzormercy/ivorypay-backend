import { use } from '@app/utils/errors';
import { Router } from 'express';
import { createUser, doAdminLogin, enableDisableUser, getUsers } from '@app/resources/admin/admin.controller';
import authorized from '@app/middlewares/authentication.middleware';
const router = Router();

router.post('/login', use(doAdminLogin));
router.post('/users/invite', authorized, use(createUser));
router.get('/users', authorized, use(getUsers));
router.put('/user/status', authorized, use(enableDisableUser));

export default router;
