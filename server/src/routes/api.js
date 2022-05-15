const express = require('express');

const router = express.Router();

router.get('/ping', async (req, res) => {
  // @todo: remove this once production ready
  return res.status(200).send(process.env);
});

module.exports = router;
