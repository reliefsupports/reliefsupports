// const jwt = require('jsonwebtoken');

// const User = require('../modals/user');
// const config = require('../config');

// const { jwtSecret } = config;

// @todo: Enable this once auth part is ready.

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (authorization) {
  //   const token = authorization.split(' ')[1];

  //   jwt.verify(token, jwtSecret, async (err, user) => {
  //     if (err) {
  //       return res.status(403).send({ code: 403, message: 'Forbidden' });
  //     }

  //     const userFetched = await User.findOne({ _id: user._id });
  //     if (userFetched) {
  //       req.user = JSON.parse(JSON.stringify(userFetched));
  //     } else {
  //       req.user = null;
  //     }
  //     next();
  //   });
  // } else {
  //   return res.status(401).send({ code: 401, message: 'Unauthrized' });
  // }

  next();
};
