const express = require('express');
// const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');

const router = express.Router();

const authMiddleware = require('../middlewares/authenticate');
// const authorizeMiddleware = require('../middlewares/authorize');

const User = require('../modals/user');

// const config = require('../config');
// const { jwtSecret } = config;

// ::user.getSingle
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    // @todo: handle no-data properly

    return res.status(200).json({
      code: 200,
      message: user,
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }

  // @todo: Enable below lines of code once auth is ready
  // const user = req.user;

  // if (user) {
  //   response.code = 200;
  //   response.message = user;
  // } else {
  //   response.code = 200;
  //   response.message = null;
  // }

  // return res.status(response.code).send(response);
  // ------
});

// @todo: ::user.post
router.post('/', authMiddleware, async (req, res) => {
  const userData = req.body;
  const { phone } = userData;

  try {
    const userIfExists = await User.findOne({ phone: phone });

    if (userIfExists)
      return res.status(400).json({
        code: 400,
        message: 'Bad Request',
      });

    // @todo: set _id from the request recieve from Firebase
    const user = new User({
      _id: uniqid(),
      phone,
    });

    await user.save();
    return res.status(200).json({
      code: 200,
      message: user,
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }

  // @todo: Enable below lines of code once auth is ready
  // const { _id } = req.user;
  // const userData = req.body;
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
  // return res.status(response.code).send(userData);
  // -----------
});

// // ::user/auth.post
// router.post('/user/auth', authorizeMiddleware, async (req, res) => {
//   const isNewUser = req.isNewUser;

//   try {
//     let user = req.user;
//     const createdAt = `${new Date()}`;
//     if (isNewUser) {
//       const newUser = {
//         ...user,
//         createdAt,
//         updatedAt: createdAt,
//       };
//       user = await User.create(newUser);
//     }

//     const accessToken = jwt.sign({ _id: user._id }, jwtSecret);
//     response.message = {
//       ...JSON.parse(JSON.stringify(user)),
//       accessToken,
//       isNewUser,
//     };
//     response.code = 200;
//   } catch (err) {
//     response.code = 401;
//     response.message = err;
//   }
//   return res.status(response.code).send(response);
// });

// ::user.patch
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    // @todo: set req.user in the authMiddleware
    const user = await User.findOne({ _id: req.params.id });

    if (!user)
      return res.status(400).json({
        code: 400,
        message: 'Bad Request',
      });

    const {
      phone,
      firstName,
      lastName,
      nicSsn,
      email,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      country,
      avatarUrl,
      orgnization,
    } = req.body;
    // @todo: pre-validate values, and kick out if invalid.

    if (phone) user.phone = phone;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (nicSsn) user.nicSsn = nicSsn;
    if (email) user.email = email;
    if (addressLine1) user.addressLine1 = addressLine1;
    if (addressLine2) user.addressLine2 = addressLine2;
    if (city) user.city = lastName;
    if (postalCode) user.postalCode = postalCode;
    if (country) user.country = country;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (orgnization) user.orgnization = orgnization;

    await user.save();
    return res.status(200).json({
      code: 200,
      message: user, // @todo: remove sensative details
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }
});

module.exports = router;
