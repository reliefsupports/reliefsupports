const mongoose = require('mongoose');

const authorSchema = mongoose.Schema(
  {
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
      default: null,
    },
    orgnization: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

const locationSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const commentSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    author: authorSchema,
    body: {
      type: String,
      required: true,
    },
    // @todo: do we track only the number of likes (store own likes)?
    // @todo: add image support
    parent: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, _id: false }
);

const entrySchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['request', 'offer'],
    },
    category: {
      type: String,
      required: true,
      enum: ['medicine', 'other'],
    },
    summary: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    status: {
      type: String,
      enum: ['draft', 'published', 'attended', 'resolved', 'archived'],
      default: 'draft',
    },
    priority: {
      type: String,
      required: true,
      enum: ['high', 'medium', 'low'],
    },
    location: locationSchema,
    author: authorSchema,
    isVerified: {
      type: Boolean,
      default: false,
    },
    externalSource: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

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
