import * as R from 'ramda';
import { AppDataSource } from '@app/config/database';
import { respond } from '@app/utils/respond';
import { verifyToken } from '@app/utils/token';
import { User } from '@app/resources/users/user.entity';
import { Admin } from '@app/resources/admin/admin.entity';

const adminRepository = AppDataSource.getRepository(Admin);
const userRepository = AppDataSource.getRepository(User);

const getTokenFromHeader = req => {
  const tokenPath = R.path(['headers', 'authorization'], req);
  if (!tokenPath) {
    return {
      type: false,
      status: 401,
      title: 'Authorization Required',
      message: 'No token provided',
    };
  }
  return {
    type: true,
    token: tokenPath.split(' ').pop(0),
  };
};

const authorized = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token.type) {
    return respond({
      status: token.status,
      title: token.title,
      message: token.message,
    })(res);
  }
  const verify = await verifyToken(token.token);
  if (!verify.type) {
    return respond({
      status: verify.status,
      title: verify.title,
      message: verify.message,
    })(res);
  }
  const user = await userRepository.findOneBy({ id: verify.data.id });
  if (user && !user?.status) {
    Object.assign(req, {
      user: {
        id: user.id,
        email: user.email,
      },
    });
    return next();
  }
  const admin = await adminRepository.findOneBy({ id: verify.data.id });
  if (admin) {
    Object.assign(req, {
      user: {
        id: admin.id,
        email: admin.email,
      },
    });
    return next();
  }

  return respond({
    status: 401,
    title: 'Unauthorized',
    message: 'Permission denied',
  })(res);
};

export default authorized;
