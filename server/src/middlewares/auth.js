import jwt from 'jsonwebtoken';

import User from 'models/User';

import { jwtSecret } from 'config';

export default async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(' ')[1];

      const { email } = jwt.verify(token, jwtSecret);
      const userExists = await User.findOne({ email });

      if (!userExists) {
        return res.status(401).json({
          code: 401,
          error: 'User not found.',
        });
      }

      return next();
    }
    return res.status(401).json({
      code: 401,
      error: 'Unauthorized',
    });
  } catch (error) {
    return res.status(401).json({
      code: 401,
      error: 'Unauthorized',
    });
  }
}
