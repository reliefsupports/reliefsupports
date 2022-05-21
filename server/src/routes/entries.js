const express = require('express');
const ShortUniqueId = require('short-unique-id');
const pick = require('lodash/pick');

const router = express.Router();
const uid = new ShortUniqueId({
  dictionary: 'alphanum_upper',
});

const Entry = require('../modals/entry');

// @todo: [improvements] move handlers into separate files

// ::entries.get(?type=request)
router.get('/', async (req, res) => {
  try {
    const query = {};

    const type = req.query.type;
    if (type) query.type = type;

    const category = req.query.category;
    if (category) query.category = category;

    const status = req.query.status;
    if (status) query.status = status;

    const priority = req.query.priority;
    if (priority) query.priority = priority;

    const keyword = req.query.search;
    if (keyword)
      query.$or = [
        { summary: new RegExp(keyword, 'i') },
        { body: new RegExp(keyword, 'i') },
      ];

    const limit = req.query.limit || 20;
    const offset =
      req.query.page && req.query.page > 0 ? (req.query.page - 1) * limit : 0;

    const entries = await Entry.find(query).skip(offset).limit(limit);
    return res.status(200).json({
      code: 200,
      message: entries,
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }
});

// ::entries.getSingle
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findOne({ id: req.params.id }); // @todo: allow for _id also

    // @todo: handle no-data properly

    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }
});

// ::entries.post
router.post('/', async (req, res) => {
  try {
    const body = pick(req.body, [
      'type',
      'category',
      'summary',
      'body',
      'author',
      'priority',
      'location',
      'externalSource',
    ]);
    // @todo: pre-validate values, and kick out if invalid.

    const entry = new Entry({
      id: uid(4),
      ...body,
    });

    await entry.save();
    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors, // @todo: parse these errors to human-readable text
    });
  }
});

// ::entries.patch-primary-fields
router.patch('/:id', async (req, res) => {
  try {
    const entry = await Entry.findOne({ id: req.params.id });

    const { summary, body, priority, status } = req.body;
    // @todo: pre-validate values, and kick out if invalid.

    if (summary) entry.summary = summary;
    if (body) entry.body = body;
    if (priority) entry.priority = priority;
    if (status) entry.status = status;
    // @todo: add other fields as necessory

    await entry.save();
    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }
});

// ::entries.delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // @todo: handle no-data properly

    await Entry.deleteOne({ id: req.params.id });

    return res.status(200).json({
      code: 200,
      message: {
        id: id,
      },
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }
});

// ::entries.add-comment
router.post('/:id/comments', async (req, res) => {
  try {
    const body = pick(req.body, ['body', 'author', 'parent']);
    // @todo: pre-validate values, and kick out if invalid.

    const entry = await Entry.findOne({ id: req.params.id });

    const comment = {
      id: uid(4),
      ...body,
    };

    entry.comments.push(comment);

    return res.status(200).json({
      code: 200,
      message: (await entry.save()).comments.find((c) => c.id === comment.id),
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }
});

// ::entries.patch-comment
router.patch('/:id/comments/:commentId', async (req, res) => {
  try {
    const entry = await Entry.findOne({ id: req.params.id });

    const { commentId } = req.params;
    const { body } = req.body;

    const comment = entry.comments.find((c) => c.id === commentId);
    comment.body = body;

    return res.status(200).json({
      code: 200,
      message: (await entry.save()).comments.find((c) => c.id === commentId),
    });
  } catch (errors) {
    // @todo: return proper error code
    return res.status(500).json({
      code: 500,
      errors: errors,
    });
  }
});

// ::entries.delete-comment
router.delete('/:id/comments/:commentId', async (req, res) => {
  try {
    const entry = await Entry.findOne({ id: req.params.id });

    const commentId = req.params.commentId;

    entry.comments = entry.comments.filter(
      (comment) => comment.id !== commentId
    );

    await entry.save();
    return res.status(200).json({
      code: 200,
      message: {
        id: commentId,
      },
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
