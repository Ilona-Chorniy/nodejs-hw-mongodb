import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/Session.js';
import { UsersCollection } from '../models/User.js';

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw createHttpError(401, 'No Authorization header');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw createHttpError(401, 'Invalid Authorization format');
    }

    const session = await SessionsCollection.findOne({ accessToken: token });
    if (!session) {
      throw createHttpError(401, 'Invalid token');
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await UsersCollection.findById(session.userId);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
