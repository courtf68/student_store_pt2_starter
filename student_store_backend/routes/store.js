const express = require("express");
const router = express.Router();
const Store = require("../models/store");

router.get("/", async (req, res, next) => {
  try {
    //ret prods
    //call store somewhere here
  } catch (err) {
    next(err);
  }
});

module.exports = router;
