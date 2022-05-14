const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  orgnization: {
    type: String,
  },
});

const locationSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
});

const entrySchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  location: locationSchema,
  author: authorSchema,
  isVerified: {
    type: Boolean,
  },
  externalSource: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

const Entry = (module.exports = mongoose.model('entry', entrySchema));
module.exports.get = function (callback, limit) {
  Entry.find(callback).limit(limit);
};

module.exports.create = (newEntry) =>
  new Promise((resolve, reject) => {
    const entry = new Entry(newEntry);
    entry.save(function (err, resp) {
      if (!err) {
        resolve(resp);
      }
      reject(err);
    });
  });
