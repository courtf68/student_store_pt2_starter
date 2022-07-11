const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res, next) => {
  try {
    //call list orders meth
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  //call create order method
});

module.exports = router;
