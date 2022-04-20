const express = require("express");
const router = express.Router();

// test method
router.get("/", (req, res) => {
  res.send("server is up and running");
});

module.exports = router;
