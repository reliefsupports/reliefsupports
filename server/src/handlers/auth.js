import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { jwtSecret, salt } from 'config';

import User from 'models/User';

export async function post(req, res) {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(403).json({
        code: 403,
        error: 'User already exist.',
      });
    }

    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });

    const userCreated = await user.save();
    const _user = { _id: userCreated._id, name, email };

    // TODO: Put expiration in the token
    const token = jwt.sign(_user, jwtSecret);

    return res.status(200).json({
      code: 200,
      message: { user: _user, token },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(401).json({
        code: 404,
        error: 'User not found.',
      });
    }

    const validUser = bcrypt.compareSync(password, userExists.password);

    if (!validUser) {
      return res.status(401).json({
        code: 401,
        error: 'Invalid credentials.',
      });
    }

    const _user = {
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    };

    // TODO: Put expiration in the token
    const token = jwt.sign(_user, jwtSecret);

    return res.status(200).json({
      code: 200,
      message: {
        user: _user,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
}
