const express = require('express');

const router = express.Router();

const Entry = require('../modals/entry');

// @todo: validate
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find({});
    return res.status(200).json({
      code: 200,
      message: entries,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findOne({ id: req.params.id });
    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;

    const entry = new Entry(body);
    await entry.save();
    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id });

    const { summary, body } = req.body;

    if (summary) {
      entry.summary = summary;
    }

    if (body) {
      entry.description = body;
    }

    await entry.save();
    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Entry.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      code: 200,
      message: {
        _id: id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
});

module.exports = router;
