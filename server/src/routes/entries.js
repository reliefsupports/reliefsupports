const express = require('express');
const ShortUniqueId = require('short-unique-id');
const pick = require('lodash/pick');

const router = express.Router();
const uid = new ShortUniqueId();

const Entry = require('../modals/entry');

// @todo: [improvements] move handlers into separate files

// ::entries.get
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find({});
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

module.exports = router;
