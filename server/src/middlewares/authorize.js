// const admin = require('firebase-admin');
const pick = require('lodash/pick');

const User = require('../modals/user');

// const verifyToken = (idToken) => admin.auth().verifyIdToken(idToken);

module.exports = async (req, res, next) => {
  const { user /* additionalUserInfo */ } = req.body;
  const { /* stsTokenManager, */ uid } = user;

  try {
    // TODO: Add proper auth logic here.
    // const { accessToken } = stsTokenManager;
    // await verifyToken(accessToken);

    const userIfExists = await User.findOne({ phoneNumber: user.phoneNumber });
    if (userIfExists) {
      req.isNewUser = false;
      req.user = userIfExists;
    } else {
      req.isNewUser = true;
      req.user = {
        _id: uid,
        ...pick(user, [
          'displayName',
          'photoURL',
          'email',
          'emailVerified',
          'phoneNumber',
        ]),
      };
    }
    next();
  } catch (err) {
    return res.status(401).send({ code: 401, message: 'Unauthrized' });
  }
};
