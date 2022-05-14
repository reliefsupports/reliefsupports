const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorize');

const User = require('../modals/user');

const config = require('../config');
const { jwtSecret } = config;

const response = {
  code: 401,
  message: null,
};

router.get('/ping', async (req, res) => {
  // @todo: remove this once production ready
  return res.status(200).send(process.env);
});

// ::user.get
router.get('/user', authMiddleware, async (req, res) => {
  const user = req.user;

  if (user) {
    response.code = 200;
    response.message = user;
  } else {
    response.code = 200;
    response.message = null;
  }

  return res.status(response.code).send(response);
});

// @todo: ::user.post
router.post('/user', authMiddleware, async (req, res) => {
  // const { _id } = req.user;
  const userData = req.body;

  // const { _id } = req.user;
  // const userData = req.body;

  // try {
  //   const createdAt = `${new Date()}`;
  //   const user = {
  //     ...userFields,
  //     ...userData,
  //     id,
  //     createdAt,
  //     updatedAt: createdAt,
  //   };
  //   await UserEx.create(id, user);

  //   const accessToken = jwt.sign({ id }, jwtSecret);

  //   response.code = 200;
  //   response.message = { ...user, accessToken, isNewUser: false };
  // } catch (err) {
  //   response.code = 401;
  //   response.message = err;
  // }
  return res.status(response.code).send(userData);
});

// ::user/auth.post
router.post('/user/auth', authorizeMiddleware, async (req, res) => {
  const isNewUser = req.isNewUser;

  try {
    let user = req.user;
    const createdAt = `${new Date()}`;
    if (isNewUser) {
      const newUser = {
        ...user,
        createdAt,
        updatedAt: createdAt,
      };
      user = await User.create(newUser);
    }

    const accessToken = jwt.sign({ _id: user._id }, jwtSecret);
    response.message = {
      ...JSON.parse(JSON.stringify(user)),
      accessToken,
      isNewUser,
    };
    response.code = 200;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

// ::user.put
router.put('/user', authMiddleware, async (req, res) => {
  const { _id } = req.user;
  const userData = req.body;

  try {
    const updatedAt = `${new Date()}`;
    const user = { ...userData, updatedAt };
    await User.updateOne({ _id }, user);
    response.code = 200;
    response.message = { ...req.user, ...user };
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

module.exports = router;
