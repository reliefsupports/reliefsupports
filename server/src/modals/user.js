const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    nicSsn: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    orgnization: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = (module.exports = mongoose.model('user', userSchema));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};

module.exports.create = (newUser) =>
  new Promise((resolve, reject) => {
    const user = new User(newUser);
    user.save(function (err, resp) {
      if (!err) {
        resolve(resp);
      }
      reject(err);
    });
  });
